import { useDispatch } from "react-redux";
import { type AppDispatch } from "src/admin/store/index";

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
