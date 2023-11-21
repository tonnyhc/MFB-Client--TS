import { useState, ChangeEvent } from "react";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

type FieldType = {
  [key: string]: string;
};

type FieldErrors = {
  [key: string]: string;
};

type ValidationType = "email" | "password" | "text";

function validateField(
  value: string,
  regex: RegExp,
  errorMessage: string
): string {
  if (!value.match(regex)) {
    return errorMessage;
  }
  return "";
}

const useFormState = (
  defaultState: FieldType,
  regexValidator?: Record<ValidationType, RegExp>
): [
  FieldType,
  FieldErrors,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLInputElement>) => string,
  (newDefaultState: FieldType) => void
] => {
  const [fields, setFields] = useState<FieldType>(defaultState);
  const [errors, setErrors] = useState<FieldErrors>(defaultState);

  const handleBlurValidation = (e: ChangeEvent<HTMLInputElement>): string => {
    const { name, value, type } = e.target;

    if (type === "email") {
      const emailError = validateField(value, emailRegex, "Invalid email!");
      setErrors((oldErrors) => ({ ...oldErrors, [name]: emailError }));
      return emailError;
    }

    if (name === "confirm_password") {
      const confirmError =
        value !== fields.password ? "Password doesn't match!" : "";
      setErrors((oldErrors) => ({ ...oldErrors, [name]: confirmError }));
      return confirmError;
    }

    if (type === "password") {
      const passwordError = validateField(
        value,
        passwordRegex,
        "Weak password!"
      );
      setErrors((oldErrors) => ({ ...oldErrors, [name]: passwordError }));
      return passwordError;
    }

    if (type === "text" && name === "username") {
      const usernameError = validateField(
        value,
        usernameRegex,
        "Invalid username!"
      );
      setErrors((oldErrors) => ({ ...oldErrors, [name]: usernameError }));
      return usernameError;
    }

    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFields((prevFields) => {
      return {
        ...prevFields,
        [name]: type === "checkbox" ? checked : value,
      } as FieldType;
    });

    if (name === "confirm_password") {
      const confirmError =
        fields.password !== value ? "Passwords don't match!" : "";
      setErrors((oldErrors) => ({
        ...oldErrors,
        confirm_password: confirmError,
      }));
    }
  };

  const changeDefaultState = (newDefaultState: FieldType): void => {
    setFields(newDefaultState);
  };

  return [
    fields,
    errors,
    handleChange,
    handleBlurValidation,
    changeDefaultState,
  ];
};

export default useFormState;
