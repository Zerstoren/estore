import React, { FC, useId } from "react";
import { useFormContext } from "react-hook-form";

import { AdminProps } from "src/admin/store/products/props";
import { type ProductAddEditForm } from "../../hooks/useProductForm";

type NumberPropProps = {
  prop: AdminProps;
};

export const NumberProp: FC<NumberPropProps> = ({ prop }) => {
  const itemId = useId();
  const { register } = useFormContext<ProductAddEditForm>();

  if (prop.type !== "number") {
    return null;
  }

  return (
    <div className="form-floating">
      <input type="number" className="form-control" id={itemId} {...register(`props.${prop._id}`)} />
      <label htmlFor={itemId}>
        {prop.name} ({prop.contextName})
      </label>
    </div>
  );
};
