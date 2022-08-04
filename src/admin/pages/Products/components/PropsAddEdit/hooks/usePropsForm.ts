import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

import {
  type AdminProps,
  clearProps,
  clearPropsList,
  getPropsProps,
  propsAddThunk,
  propsEditThunk,
  propsGetThunk,
} from "src/admin/store/products/props";
import { useAppDispatch } from "src/admin/store/useAppDispatch";
import type { RouteParamsPropsEdit } from "src/admin/pages/Products/Products";
import { useSelector } from "react-redux";

export type PropsAddEditForm = {
  name: string;
  contextName: string;
  hidden: boolean;
  type: "string" | "number" | "boolean" | "tuple";
  variants: Array<{
    name: string;
    position: number;
    hidden: boolean;
    _id: string;
  }>;
};

export const usePropsForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowTuple, setIsShowTuple] = useState(false);
  const propParams = useParams<RouteParamsPropsEdit>();
  const propItem = useSelector(getPropsProps);

  const methods = useForm<PropsAddEditForm>();
  const variantsFieldArray = useFieldArray({
    control: methods.control,
    name: "variants",
  });
  const { handleSubmit, watch } = methods;

  useEffect(() => {
    if (propParams.id) {
      dispatch(propsGetThunk(propParams.id));
    }

    return () => {
      dispatch(clearProps());
    };
  }, [propParams.id]);

  useEffect(() => {
    variantsFieldArray.insert(0, { name: "", position: 0 });
  }, []);

  useEffect(() => {
    return watch((value, { name }) => {
      setIsShowTuple(value.type === "tuple");
    }).unsubscribe;
  }, [watch]);

  useEffect(() => {
    if (!propItem) return;

    methods.reset({
      name: propItem.name,
      contextName: propItem.contextName,
      type: propItem.type,
      variants: propItem.variants || [],
    });
  }, [propItem]);

  const onSubmit = handleSubmit(async (data) => {
    const newVariants = data.variants?.map((item, index) => {
      return {
        ...item,
        hidden: item.hidden || false,
        position: index,
      };
    });

    if (propItem) {
      await dispatch(
        propsEditThunk({
          _id: propItem._id,
          record: {
            ...data,
            hidden: data.hidden || false,
            variants: newVariants,
          },
        }),
      );
    } else {
      await dispatch(
        propsAddThunk({
          ...data,
          hidden: data.hidden || false,
          variants: newVariants,
        }),
      );
    }

    await dispatch(clearPropsList());
    navigate("/admin/products/props");
  });

  return {
    methods,
    onSubmit,
    variantsFieldArray,
    isShowTuple,
  };
};
