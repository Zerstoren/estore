import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/admin/store/useAppDispatch";
import {
  AdminCategories,
  categoryChangeParentThunk,
  categoryListThunk,
  getList,
} from "src/admin/store/products/categories";

export const useCategoryDrag = () => {
  const dispatch = useAppDispatch();
  const categoryList = useSelector(getList);
  const ref = useRef<HTMLDivElement | HTMLHeadingElement | null>(null);
  const isDragging = useRef(false);
  const intersectedElement = useRef<HTMLDivElement | null>(null);

  const hasParentsCollision = useCallback(
    (baseElementId: string | null, targetElement: AdminCategories | undefined) => {
      if (!targetElement) {
        return false;
      }

      if (targetElement.parent_id === baseElementId) {
        return true;
      }

      if (
        hasParentsCollision(
          baseElementId,
          categoryList.find((c) => c.parent_id === baseElementId),
        )
      ) {
        return true;
      }

      return false;
    },
    [],
  );

  const findIntersectionObject = useCallback((baseElement: HTMLDivElement) => {
    const elements = document.querySelectorAll(".category-tree-item");
    const baseElementRect = baseElement.getBoundingClientRect();

    const foundedIntersectionElement = Array.from(elements).find((element) => {
      if (element.getAttribute("data-id") === baseElement.getAttribute("data-id")) {
        return false;
      }

      const rect = element.getBoundingClientRect();

      return (
        rect.bottom > baseElementRect.top &&
        rect.right > baseElementRect.left &&
        rect.top < baseElementRect.bottom &&
        rect.left < baseElementRect.right
      );
    });

    if (intersectedElement.current) {
      intersectedElement.current.style.backgroundColor = "transparent";
      intersectedElement.current = null;
    }

    const foundedDataId = foundedIntersectionElement?.getAttribute("data-id");
    const baseElementDataId = baseElement.getAttribute("data-id");

    if (
      foundedDataId &&
      foundedDataId !== "root" &&
      hasParentsCollision(
        baseElementDataId,
        categoryList.find((category) => category._id === foundedDataId),
      )
    ) {
      return;
    }

    if (
      foundedIntersectionElement instanceof HTMLDivElement ||
      foundedIntersectionElement instanceof HTMLHeadingElement
    ) {
      foundedIntersectionElement.style.backgroundColor = "red";
      intersectedElement.current = foundedIntersectionElement;
    }
  }, []);

  const handleDragDown = useCallback((e: PointerEvent) => {
    e.preventDefault();
    if (!ref.current) return;

    isDragging.current = true;
    ref.current.setPointerCapture(e.pointerId);
  }, []);

  const handleDragMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current || !ref.current) return;

    ref.current.style.position = "fixed";
    ref.current.style.left = `${e.clientX - 8}px`;
    ref.current.style.top = `${e.clientY - 8}px`;

    findIntersectionObject(ref.current);
  }, []);

  const handleDragUp = useCallback(async (e: PointerEvent) => {
    e.preventDefault();
    if (!isDragging.current || !ref.current) return;

    isDragging.current = false;
    ref.current.releasePointerCapture(e.pointerId);
    ref.current.style.position = "inherit";

    if (!intersectedElement.current) {
      return;
    }

    const parentId = ref.current.getAttribute("data-id");
    const intersectedId = intersectedElement.current?.getAttribute("data-id");

    if (!parentId || !intersectedId) {
      return;
    }

    try {
      await dispatch(
        categoryChangeParentThunk({
          _id: parentId,
          parent_id: intersectedId === "root" ? null : intersectedId,
        }),
      );

      await dispatch(categoryListThunk());
    } finally {
      intersectedElement.current.style.backgroundColor = "transparent";
      intersectedElement.current = null;
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return () => {};

    ref.current.addEventListener("pointerdown", handleDragDown);
    ref.current.addEventListener("pointermove", handleDragMove);
    ref.current.addEventListener("pointerup", handleDragUp);
    ref.current.addEventListener("pointercancel", handleDragUp);

    return () => {
      if (!ref.current) return;

      ref.current.removeEventListener("pointerdown", handleDragDown);
      ref.current.removeEventListener("pointermove", handleDragMove);
      ref.current.removeEventListener("pointerup", handleDragUp);
      ref.current.removeEventListener("pointercancel", handleDragUp);
    };
  });

  return ref;
};
