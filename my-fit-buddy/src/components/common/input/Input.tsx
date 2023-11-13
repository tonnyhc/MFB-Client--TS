import { ChangeEvent, FocusEvent, ReactNode, useState } from "react";

interface InputProps {
  labelText: string;
  labelName: string;
  inputType: "password" | "email" | "text";
  inputStyle: "transparent" | "regular";
  fontSizePx?: string;
  placeholder: string;
  value: string;
  isRequired: boolean;
  inputSize: "xs" | "s" | "xxl" | "full";
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => string | null;
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,
}

const inputSizeStylesObj = {
  xs: "w-[60px] h-[50px]",
  s: "w-[60px] h-[50px]",
  xxl: "w-[250px] h-[50px]",
  full: "w-full h-[50px]",
};

const inputStylesObj = {
  transparent: "bg-transparent border-b-2 border-white rounded-none",
  regular: "border rounded-[10px] bg-grey-bg",
};

const Input: React.FC<InputProps> = ({
  labelText,
  labelName,
  inputType,
  inputStyle = "regular",
  fontSizePx = "18px",
  placeholder,
  value,
  isRequired,
  onChange,
  onBlur,
  inputSize = "full",
  errorMessage,
  leftIcon,
  rightIcon
}) => {
  const [error, setError] = useState({
    hasError: false,
    errorMessage: errorMessage ? errorMessage : "",
  });

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const blurValidationError = onBlur ? onBlur(e) : null;

    setError((oldError) => ({
      ...oldError,
      hasError:
        (value === "" && isRequired) || blurValidationError !== ""
          ? true
          : false,
      errorMessage: blurValidationError
        ? blurValidationError
        : oldError.errorMessage || `${labelText} is required!`,
    }));
  };

  const inputStyles = inputStyle
    ? inputStylesObj[inputStyle]
    : inputStylesObj["regular"];
  const inputSizeStyles = inputSize
    ? inputSizeStylesObj[inputSize]
    : inputSizeStylesObj["full"];
  const errorInputStyles = "border-red-600 text-red-400";

  // ${isFocused || value ? "border-white" : "border-gray-300"} 
  return (
    <div
      className={`relative ${inputSizeStyles} ${inputStyles} group flex items-center`}
    >
      {leftIcon}
      <input

        className={`w-full h-full text-white px-2 bg-transparent 
          ${error.hasError ? errorInputStyles : ""}`}
        style={{ fontSize: fontSizePx }}
        type={inputType}
        id={labelName}
        name={labelName}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      {rightIcon}
    </div>
  );
};

export default Input;
