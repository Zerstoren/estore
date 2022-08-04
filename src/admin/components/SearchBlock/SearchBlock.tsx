import React, { FC } from "react";
import cx from "classnames";

import { useSearchBlock } from "./hooks/useSearchBlock";
import styles from "./searchBlock.module.scss";

type SearchBlockProps = {
  onSearch: (text: string) => void;
};

export const SearchBlock: FC<SearchBlockProps> = ({ onSearch }) => {
  const { onClickSearch, onClickCancel, onSubmit, register } = useSearchBlock(onSearch);

  return (
    <form className={cx("row align-items-center", styles.searchBlock)} onSubmit={onSubmit}>
      <div className="col-auto input-group">
        <input type="text" {...register("search")} className="form-control" />
        <span className="input-group-text">
          <i className={cx("fas fa-ban", styles.searchBlockIcon)} onClick={onClickCancel} />
        </span>
        <span className="input-group-text">
          <i className={cx("fas fa-search", styles.searchBlockIcon)} onClick={onClickSearch} />
        </span>
      </div>
    </form>
  );
};
