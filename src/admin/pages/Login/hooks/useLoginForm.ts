import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "src/admin/store";
import { loginThunk, validationSelector } from "src/admin/store/user/auth";
import { LoginForm } from "src/utils/forms/admin/LoginForm";

export const useLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const validation = useSelector(validationSelector);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {},
  });

  useEffect(() => {
    if (Object.keys(validation).length) {
      setError("login", { message: validation.login });
      setError("password", { message: validation.password });
    } else {
      clearErrors();
    }
  }, [validation]);

  const onSubmit = handleSubmit(async (data) => {
    dispatch(loginThunk({ login: data.login, password: data.password }));
  });

  return {
    register,
    onSubmit,
    errors,
  };
};
