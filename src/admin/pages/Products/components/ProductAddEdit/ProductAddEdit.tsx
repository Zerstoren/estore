import React, { FC } from "react";
import cx from "classnames";
import AsyncSelect from "react-select/async";
import { FormProvider } from "react-hook-form";

import { useProductForm } from "src/admin/pages/Products/components/ProductAddEdit/hooks/useProductForm";
import { SeoBlock } from "src/admin/components/SeoBlock";
import { ImagesUpload } from "src/admin/components/ImagesUpload";
import { ProductProps } from "./ProductProps";

type ProductAddEditProps = {
  isAdd?: boolean;
};

export const ProductAddEdit: FC<ProductAddEditProps> = ({ isAdd = false }) => {
  const { onSubmit, onSeoClear, onSearchCategory, onChangeCategory, isPredefinedOpen, methods, categoryId } =
    useProductForm(null);
  const { register } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <h2 className="tm-block-title">{isAdd ? "Add new product" : "Edit product"}</h2>

        <div className="form-group mb-3">
          <AsyncSelect
            instanceId="product"
            cacheOptions
            defaultOptions
            loadOptions={onSearchCategory}
            onChange={onChangeCategory}
          />
        </div>

        <div className="form-group mb-3">
          <div className="form-floating">
            <input {...register("name")} id="name" className="form-control validate" />
            <label htmlFor="name">Product name</label>
          </div>
        </div>

        <div className="form-group mb-3">
          <div className="form-floating">
            <input {...register("sku")} id="name" className="form-control validate" />
            <label htmlFor="name">Product SKU</label>
          </div>
        </div>

        <div className="form-group mb-3">
          <div className="form-floating">
            <input {...register("price")} type="number" id="name" className="form-control validate" />
            <label htmlFor="name">Price</label>
          </div>
        </div>

        <div className="form-group mb-3">
          <div className="form-floating">
            <ImagesUpload />
          </div>
        </div>

        <div className="form-group mb-3">
          <div className="form-floating">
            <ProductProps categoryId={categoryId} />
          </div>
        </div>

        <SeoBlock onClearValue={onSeoClear} isPredefineOpen={isPredefinedOpen}>
          <div className="form-group mb-3">
            <div className="form-floating">
              <input {...register("url")} id="url" className="form-control validate" />
              <label htmlFor="url">Url</label>
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="form-floating">
              <input {...register("title")} id="title" className="form-control validate" />
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="form-floating">
              <input {...register("keywords")} id="keywords" className="form-control validate" />
              <label htmlFor="keywords">Keywords</label>
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="form-floating">
              <input {...register("description")} id="description" className="form-control validate" />
              <label htmlFor="description">Description</label>
            </div>
          </div>
        </SeoBlock>

        <div className={cx("form-group mb-3")}>
          <button type="submit" className="btn btn-primary btn-block text-uppercase">
            {isAdd ? "Create" : "Edit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
