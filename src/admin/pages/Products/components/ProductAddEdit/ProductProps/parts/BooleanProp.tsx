import React, { FC, useId } from "react";
import { useFormContext } from "react-hook-form";

import { AdminProps } from "src/admin/store/products/props";
import { ProductAddEditForm } from "../../hooks/useProductForm";

type BooleanPropProps = {
  prop: AdminProps;
};

export const BooleanProp: FC<BooleanPropProps> = ({ prop }) => {
  const itemId = useId();
  const { register } = useFormContext<ProductAddEditForm>();

  if (prop.type !== "boolean") {
    return null;
  }

  return (
    <div className="form-floating">
      <div className="form-control form-check">
        <input className="form-check-input" type="checkbox" id={itemId} {...register(`props.${prop._id}`)} />
      </div>
      <label htmlFor={itemId}>
        {prop.name} ({prop.contextName})
      </label>
    </div>
  );
};
