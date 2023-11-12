import { ChangeEvent, SyntheticEvent } from "react";
import useFormState from "../../hooks/useFormState";
import Input from "../common/input/Input";

type RegisterState = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register: React.FC = () => {
  const initialState: RegisterState = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formData, errors, handleChange, handleBlurValidation] =
    useFormState(initialState);

  async function onSubmitRegister(e: SyntheticEvent): Promise<any> {
    e.preventDefault();
    const formDataCopy = { ...formData };
    delete formDataCopy.confirm_password;
    try {
      const data = await registerRequest(formDataCopy);
      userLogin(data);
      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.non_field_errors);
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
              labelText="Username"
              placeholder="Username"
              labelName="username"
              inputType="text"
              value={formData.username}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              errorMessage={errors.username}
              inputSize="sm"
            />
            <Input
              labelText="Email"
              placeholder="Email"
              labelName="email"
              inputType="email"
              value={formData.email}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              errorMessage={errors.email}
            />

            <Input
              labelText="Password"
              placeholder="Password"
              labelName="password"
              inputType="password"
              value={formData.password}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              errorMessage={errors.password}
            />

            <Input
              labelText="Confirm Password"
              placeholder="Confirm Password"
              labelName="confirm_password"
              inputType="password"
              value={formData.confirm_password}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              errorMessage={errors.confirm_password}
            />
          </div>
          <Button
            text="Register"
            color="light-grey"
            width="full"
            shape="rectangular"
            disabled={Object.values(errors).some((error) => !!error)}
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
