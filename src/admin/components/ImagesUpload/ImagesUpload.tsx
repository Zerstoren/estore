import React from "react";
import cx from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useImageDnD } from "./hooks/useImageDnD";
import styles from "./images-upload.module.scss";

export const ImagesUpload = () => {
  const { target, images } = useImageDnD();
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className={styles.imagesUpload} draggable="true" ref={target}>
      <div className={styles.imagesUploadFlex} ref={parent}>
        {images.map((file) => {
          return (
            <div className={styles.imagesUploadImage}>
              <i
                className={cx(
                  "fas fa-check",
                  styles.imagePrimaryIcon,
                  file.isPrimary && styles.imagePrimaryIconPrimary,
                )}
              />
              <i className={cx("fas fa-ban", styles.imageRemoveIcon)} />
              <div className={styles.imagesUploadImageContainer}>
                <img key={file.file.name} src={file.base64} alt="test" />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.imagesUploadElement}>Drop to upload</div>
    </div>
  );
};
