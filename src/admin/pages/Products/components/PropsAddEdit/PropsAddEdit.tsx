import React, { FC } from "react";
import cx from "classnames";
import { usePropsForm } from "./hooks/usePropsForm";

import styles from "./propsAddEdit.module.scss";

type PropsAddEditProps = {
  isAdd?: boolean;
};

export const PropsAddEdit: FC<PropsAddEditProps> = ({ isAdd = false }) => {
  const {
    methods,
    onSubmit,
    isShowTuple,
    variantsFieldArray: { fields, insert, remove, move, update },
  } = usePropsForm();
  const { register } = methods;

  return (
    <form onSubmit={onSubmit}>
      <h2 className="tm-block-title">{isAdd ? "Add new props" : "Edit props"}</h2>

      <div className="form-group mb-3">
        <div className="form-floating">
          <input {...register("name")} id="name" className="form-control validate" />
          <label htmlFor="name">Prop name</label>
        </div>
      </div>

      <div className="form-group mb-3">
        <div className="form-floating">
          <input {...register("contextName")} id="contextName" className="form-control validate" />
          <label htmlFor="name">Prop context name (hidden from users)</label>
        </div>
      </div>

      <div className="form-group mb-3">
        <div className="form-floating">
          <select {...register("type")} id="type" className="form-control validate" disabled={!isAdd}>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="tuple">Variants</option>
          </select>
          <label htmlFor="name">Prop type</label>
        </div>
      </div>

      {isShowTuple && (
        <>
          {fields.map((field, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={field._id || index} className={cx("input-group mb-3", styles.variantInputBox)}>
              <span className="input-group-text">
                <i
                  className="fas fa-plus"
                  onClick={() =>
                    insert(index + 1, {
                      name: "",
                      position: 0,
                    })
                  }
                />

                {isAdd && <i className="fas fa-minus" onClick={() => remove(index)} />}

                {field.hidden
                  ? !isAdd &&
                    field.name && (
                      <i className="fas fa-eye" onClick={() => update(index, { ...field, hidden: false })} />
                    )
                  : !isAdd &&
                    field.name && (
                      <i className="fas fa-eye-slash" onClick={() => update(index, { ...field, hidden: true })} />
                    )}

                {index !== 0 ? (
                  <i className="fas fa-caret-up" onClick={() => move(index, index - 1)} />
                ) : (
                  <i className={styles.variantInputBoxEmpty} />
                )}

                {index !== fields.length - 1 ? (
                  <i className="fas fa-caret-down" onClick={() => move(index, index + 1)} />
                ) : (
                  <i className={styles.variantInputBoxEmpty} />
                )}
              </span>
              <input disabled={field.hidden} className="form-control" {...register(`variants.${index}.name`)} />
            </div>
          ))}
        </>
      )}

      <div className={cx("form-group mb-3")}>
        <button type="submit" className="btn btn-primary btn-block text-uppercase">
          {isAdd ? "Create" : "Edit"}
        </button>
      </div>
    </form>
  );
};
