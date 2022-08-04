import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { AdminProps, getPropsList, propsEditThunk, propsListThunk } from "src/admin/store/products/props";
import { useAppDispatch } from "src/admin/store/useAppDispatch";

export const usePropsList = () => {
  const dispatch = useAppDispatch();
  const listData = useSelector(getPropsList);
  const { limit, offset, search } = listData;

  const toggleItem = useCallback(
    async (item: AdminProps, hidden: boolean) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, variants, ...omittedItem } = item;

      await dispatch(
        propsEditThunk({
          _id,
          record:
            omittedItem.type === "tuple"
              ? {
                  ...omittedItem,
                  hidden,
                  variants: item.variants || [],
                }
              : { ...omittedItem, hidden },
        }),
      );

      dispatch(
        propsListThunk({
          limit,
          offset,
          search,
        }),
      );
    },
    [limit, offset, search],
  );

  const hideItem = useCallback((item: AdminProps) => toggleItem(item, true), [limit, offset, search]);
  const showItem = useCallback((item: AdminProps) => toggleItem(item, false), [limit, offset, search]);

  const onSearch = useCallback(
    (text: string) => {
      dispatch(
        propsListThunk({
          limit,
          offset,
          search: text,
        }),
      );
    },
    [limit, offset],
  );

  const onPageChange = useCallback(
    (newOffset: number) => {
      dispatch(
        propsListThunk({
          limit,
          offset: newOffset,
          search,
        }),
      );
    },
    [limit, search],
  );

  useEffect(() => {
    dispatch(
      propsListThunk({
        limit,
        offset,
        search,
      }),
    );
  }, [dispatch]);

  return {
    list: listData.items,
    onSearch,
    showItem,
    hideItem,
    pagination: {
      limit: listData.limit,
      offset: listData.offset,
      total: listData.total,
      onPageChange,
    },
  };
};
