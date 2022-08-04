import { useForm } from "react-hook-form";
import { useRef } from "react";

type SearchBlockFields = {
  search: string;
};

export const useSearchBlock = (onSearch: (text: string) => void) => {
  const { register, watch, getValues, reset, handleSubmit } = useForm<SearchBlockFields>();
  const refSearch = useRef<null | ReturnType<typeof setTimeout>>(null);

  watch((values) => {
    const value = values.search || "";

    if (refSearch.current) {
      clearTimeout(refSearch.current);
    }

    refSearch.current = setTimeout(() => {
      onSearch(value);
      refSearch.current = null;
    }, 2000);
  });

  const onSubmit = handleSubmit((data) => {
    if (refSearch.current) {
      clearTimeout(refSearch.current);
      refSearch.current = null;
    }

    onSearch(data.search);
  });

  const onClickSearch = () => {
    if (refSearch.current) {
      clearTimeout(refSearch.current);
      refSearch.current = null;
    }

    onSearch(getValues("search") || "");
  };

  const onClickCancel = () => {
    reset({
      search: "",
    });

    if (refSearch.current) {
      clearTimeout(refSearch.current);
      refSearch.current = null;
    }

    onSearch("");
  };

  return {
    onClickCancel,
    onClickSearch,
    register,
    onSubmit,
  };
};
