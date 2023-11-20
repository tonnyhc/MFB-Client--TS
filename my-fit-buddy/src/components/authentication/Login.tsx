import { Link } from "react-router-dom";
import { useMutation } from "react-query";

import { BsFillPersonFill } from "react-icons/bs";

import Button from "../common/button/Button";
import Input from "../common/input/Input";
import useFormState from "../../hooks/useFormState";
import { SyntheticEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { loginRequest } from "../../services/authenticationServices";
import { useState } from "react";
import { LoginBody } from "../../ts/types";
import PasswordInput from "../common/input/PasswordInput";

const Login = () => {
  const initialState: LoginBody = {
    email_or_username: "",
    password: "",
  };

  const [formData, errors, handleChange, handleBlurValidation] =
    useFormState(initialState);

  const [requestErrors, setRequestErrors] = useState("");
  const { userLogin } = useContext(AuthContext);

  const { mutate, isLoading, isError, error } = useMutation(
    () => loginRequest(formData as LoginBody),
    {
      onSuccess: (data) => userLogin(data),
      onError: (error) => {
        alert(error);
      },
    }
  );

  async function onSubmitLogin(e: SyntheticEvent) {
    e.preventDefault();
    mutate();
  }

  return (
    <section className="w-full h-full px-4 py-6 text-white overflow-hidden">
      <div className="m-auto w-[85%] h-full flex flex-col justify-center items-center gap-10 ">
        <form className="w-full" onSubmit={onSubmitLogin}>
          <div className="flex flex-col gap-3 items-center justify-center w-full mb-7">
            <p className="text-red-400">{requestErrors}</p>
            <Input
              placeholder="Email or Username"
              inputName="email_or_username"
              inputType="text"
              value={formData.email_or_username}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              errorMessage={errors.email_or_username}
              inputSize="full"
              inputStyle={"transparent"}
              leftIcon={<BsFillPersonFill />}
            />
            <PasswordInput
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlurValidation}
            />
          </div>
          <Button
            text="Login"
            color="light-grey"
            width="full"
            shape="rectangular"
            type={"default"} // disabled={Object.values(errors).some((error) => !!error)}
            isLoading={isLoading}
          />
        </form>

        <p className="text-gray-400 text-sm">
          <Link to="/reset-password">Forgot your password?</Link>
        </p>
        <p className="text-gray-400 text-sm">
          <Link to="/register">
            Don't have an account? Click here to Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
