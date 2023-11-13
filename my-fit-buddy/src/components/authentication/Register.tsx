import { SyntheticEvent, useContext } from "react";

import { IoIosMail } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";

import useFormState from "../../hooks/useFormState";
import Input from "../common/input/Input";
import { registerRequest } from "../../services/authenticationServices";
import { RegisterBody, RegisterFormState } from "../../ts/types";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../common/button/Button";
import { Link } from "react-router-dom";
import PasswordInput from "../common/input/PasswordInput";

const initialState: RegisterFormState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register: React.FC = () => {
  const { userLogin } = useContext(AuthContext);
  const [formData, errors, handleChange, handleBlurValidation] =
    useFormState(initialState);

  async function onSubmitRegister(e: SyntheticEvent): Promise<any> {
    e.preventDefault();
    const formDataCopy: RegisterBody = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    try {
      const data = await registerRequest(formDataCopy);
      userLogin(data);
      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error);
      }
    }
  }

  return (
    <section className="w-full h-full px-4 py-6 text-white overflow-hidden">
      <div>
        <h3 className="font-semibold uppercase text-lg">
          Register and become the best version of yourself!
        </h3>
      </div>

      <div className="m-auto w-[85%] h-full flex flex-col justify-center items-center gap-10 ">
        <form className="w-full" onSubmit={onSubmitRegister}>
          <div className="flex flex-col gap-3 items-center justify-center w-full mb-7">
            <Input
              placeholder="Username"
              inputName="username"
              inputType="text"
              value={formData.username}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              errorMessage={errors.username}
              inputSize="full"
              inputStyle="transparent"
              leftIcon={<BsFillPersonFill />}
            />
            <Input
              placeholder="Email"
              inputName="email"
              inputType="email"
              value={formData.email}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="full"
              errorMessage={errors.email}
              inputStyle="transparent"
              leftIcon={<IoIosMail />}
            />
            <PasswordInput
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlurValidation}
            />
            <PasswordInput
              inputName="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              onBlur={handleBlurValidation}
            />
          </div>
          <Button
            text="Register"
            color="light-grey"
            width="full"
            shape="rectangular"
            disabled={Object.values(errors).some((error) => !!error)}
            type="default"
          />
        </form>

        <p className="text-gray-400 text-sm">
          <Link to="/login">Already have an account? Click here to Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
