import { createContext, useContext } from "react";
import { setLoggedUser } from "src/admin/store/user/auth";
import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { AdminUser } from "src/admin/store/user/userAdmins";

export const ServerSidePropsContext = createContext<{
  user: null | AdminUser;
}>({
  user: null,
});

export const SetServerSideProps = () => {
  const serverSideProps = useContext(ServerSidePropsContext);
  const dispatch = useAppDispatch();

  if (serverSideProps.user) {
    dispatch(setLoggedUser(serverSideProps.user));
  }

  return null;
};
