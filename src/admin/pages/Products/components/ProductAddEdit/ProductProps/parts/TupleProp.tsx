import React, { FC, useId } from "react";
import { useFormContext } from "react-hook-form";
import cx from "classnames";

import { AdminProps } from "src/admin/store/products/props";

import { ProductAddEditForm } from "../../hooks/useProductForm";
import styles from "../productProps.module.scss";

type TuplePropProps = {
  prop: AdminProps;
};

export const TupleProp: FC<TuplePropProps> = ({ prop }) => {
  const itemId = useId();
  const { register } = useFormContext<ProductAddEditForm>();

  if (prop.type !== "tuple") {
    return null;
  }

  return (
    <div className="form-floating">
      <div className={cx(styles.productPropsTupleVariant, "form-control")}>
        {prop.variants?.map((variant) => {
          return (
            <div className="form-check" key={variant._id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={variant._id}
                {...register(`props.${prop._id}.${variant._id}`)}
              />
              <label className="form-check-label" htmlFor={variant._id}>
                {variant.name}
              </label>
            </div>
          );
        })}
      </div>
      <label htmlFor={itemId}>
        {prop.name} ({prop.contextName})
      </label>
    </div>
  );
};
