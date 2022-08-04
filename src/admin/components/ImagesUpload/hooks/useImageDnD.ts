import { useEffect, useRef, useState } from "react";

import styles from "../images-upload.module.scss";

type FileItem = {
  file: File;
  isPrimary: boolean;
  base64: string;
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const useImageDnD = () => {
  const target = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<FileItem[]>([]);

  useEffect(() => {
    if (!target.current) {
      return () => {};
    }

    const dragEnter = (e: DragEvent) => {
      e.preventDefault();
      target.current?.classList.add(styles.imagesUploadDragOver);
    };

    const dragLeave = () => {
      target.current?.classList.remove(styles.imagesUploadDragOver);
    };

    const drop = async (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dragLeave();
      const files = await Promise.all(
        Array.from(e.dataTransfer?.files || []).map(
          async (file): Promise<FileItem> => ({
            file,
            isPrimary: false,
            base64: await toBase64(file),
          }),
        ),
      );

      setImages((prevState) => {
        return [...prevState, ...files];
      });
    };

    target.current.addEventListener("dragover", dragEnter);
    target.current.addEventListener("dragenter", dragEnter);
    target.current.addEventListener("dragleave", dragLeave);
    target.current.addEventListener("drop", drop);

    return () => {
      if (!target.current) {
        return;
      }

      target.current.removeEventListener("dragover", dragEnter);
      target.current.removeEventListener("dragenter", dragEnter);
      target.current.removeEventListener("dragleave", dragLeave);
      target.current.removeEventListener("drop", drop);
    };
  }, []);

  return {
    target,
    images,
  };
};
