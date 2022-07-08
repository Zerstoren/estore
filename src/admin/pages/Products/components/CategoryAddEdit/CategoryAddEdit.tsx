import React, { FC } from "react";
import cx from "classnames";

import { SeoBlock } from "src/admin/components/SeoBlock";

import { useCategoryItem } from "./hooks/useCategoryItem";
import { useCategoryForm } from "./hooks/useCategoryForm";

type CategoryAddEditProps = {
  isAdd?: boolean;
};

export const CategoryAddEdit: FC<CategoryAddEditProps> = ({ isAdd = false }) => {
  const category = useCategoryItem();
  const {
    onSubmit,
    onSeoClear,
    isPredefinedOpen,
    methods: { register },
  } = useCategoryForm(category);

  return (
    <form onSubmit={onSubmit}>
      <h2 className="tm-block-title">{isAdd ? "Add new category" : `Edit category, ${category?.name}`}</h2>

      <div className="form-group mb-3">
        <div className="form-floating">
          <input {...register("name")} id="name" className="form-control validate" />
          <label htmlFor="name">Category name</label>
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
  );
};