import { AdminCategoryTree, categoryDelThunk, clearCategoryList } from "src/admin/store/products/categories";
import { useAppDispatch } from "src/admin/store/useAppDispatch";

const collectAllChildrenIds = (category: AdminCategoryTree, childrenIds: string[]) => {
  if (category.children) {
    category.children.forEach((child) => {
      childrenIds.push(child._id);
      collectAllChildrenIds(child, childrenIds);
    });
  }
};

export const useCategoryDelete = (category: AdminCategoryTree) => {
  const dispatch = useAppDispatch();

  return async () => {
    const categoriesIds: string[] = [category._id];
    collectAllChildrenIds(category, categoriesIds);

    await dispatch(categoryDelThunk({ ids: categoriesIds }));
    await dispatch(clearCategoryList());
  };
};
