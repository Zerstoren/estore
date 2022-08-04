import React, { FC } from "react";
import cx from "classnames";

import styles from "./paginationBlock.module.scss";

type PaginationBlockProps = {
  onPageChange: (page: number) => void;
  offset: number;
  total: number;
  limit?: number;
};

export const PaginationBlock: FC<PaginationBlockProps> = ({ offset, onPageChange, total, limit = 10 }) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.ceil(offset / limit) + 1;

  if (totalPages === 1) {
    return null;
  }

  return (
    <nav className={styles.paginationBlock}>
      <ul className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;

          return (
            <li key={page} className={cx("page-item", currentPage === page && "active")}>
              <div
                className={cx("page-link", currentPage !== page && styles.paginationBlockItem)}
                onClick={() => {
                  if (currentPage !== page) onPageChange(index * limit);
                }}
              >
                {page}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
