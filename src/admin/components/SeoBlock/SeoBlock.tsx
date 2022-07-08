import React, { FC, PropsWithChildren, useLayoutEffect, useState } from "react";
import cx from "classnames";
import linkStyles from "src/admin/scss/links.module.scss";
import seoStyles from "./seoBlock.module.scss";

type SeoBlockProps = {
  onClearValue?: () => void;
  isPredefineOpen?: boolean;
};

export const SeoBlock: FC<PropsWithChildren<SeoBlockProps>> = ({ children, onClearValue, isPredefineOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isPredefineOpen);

  useLayoutEffect(() => {
    setIsOpen(isPredefineOpen);
  }, [isPredefineOpen]);

  const onClickLink = () => {
    if (isOpen && onClearValue) {
      onClearValue();
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={seoStyles.seoPaddings}>
      <div onClick={onClickLink} className={cx(seoStyles.seoLink, linkStyles.adminIconLinks)}>
        {isOpen ? "Remove custom values" : "Set SEO data for custom values"}
      </div>
      <div className={isOpen ? seoStyles.showedBlock : seoStyles.hiddenBlock}>{children}</div>
    </div>
  );
};
