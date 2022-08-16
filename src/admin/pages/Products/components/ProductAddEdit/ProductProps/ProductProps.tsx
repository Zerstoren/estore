import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { getProductPropsSelector, productGetPropsByCategory } from "src/admin/store/products/products";

import { StringProp } from "./parts/StringProp";
import { NumberProp } from "./parts/NumberProp";
import { BooleanProp } from "./parts/BooleanProp";
import { TupleProp } from "./parts/TupleProp";

import styles from "./productProps.module.scss";

type ProductPropsProp = {
  categoryId: string;
};

export const ProductProps: FC<ProductPropsProp> = ({ categoryId }) => {
  const dispatch = useAppDispatch();
  const props = useSelector(getProductPropsSelector);

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    dispatch(productGetPropsByCategory(categoryId));
  }, [categoryId]);

  if (!props) {
    return null;
  }

  return (
    <div className={styles.productProps}>
      <h2 className="tm-block-title">Props</h2>

      {props.map((prop) => {
        switch (prop.type) {
          case "string":
            return <StringProp key={prop._id} prop={prop} />;
          case "number":
            return <NumberProp key={prop._id} prop={prop} />;
          case "boolean":
            return <BooleanProp key={prop._id} prop={prop} />;
          case "tuple":
            return <TupleProp key={prop._id} prop={prop} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
