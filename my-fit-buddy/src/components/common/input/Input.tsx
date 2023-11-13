import { ChangeEvent, FocusEvent, useState } from "react";

interface InputProps {
  labelText: string;
  labelName: string;
  inputType: string;
  inputStyle: "transparent" | "regular";
  fontSizePx?: string;
  placeholder: string;
  value: string;
  isRequired: boolean;
  inputSize: "xs" | "s" | "xxl" | "full";
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => string | null;
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
  inputStyle = 'regular',
  fontSizePx = '18px',
  placeholder,
  value,
  isRequired,
  onChange,
  onBlur,
  inputSize= 'full',
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    errorMessage: errorMessage ? errorMessage : "",
  });

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(value === "" ? false : true);
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
  // useEffect(() => {
  //   if (value !== "" && parseFloat(value) >= 0) {
  //     setIsFocused(true);
  //   }
  // }, [value]);

  const inputStyles = inputStyle ? inputStylesObj[inputStyle] : inputStylesObj['regular'];
  const inputSizeStyles = inputSize ? inputSizeStylesObj[inputSize] : inputSizeStylesObj['full'];
  const errorInputStyles = "border-red-600 text-red-400";
  // const labelUpStyles = "top-0 scale-75 -translate-y-1.5";
  // const labelDownStyles = "py-[14px] px-[6px]";
  // const errorLabelStyles = "text-red-400";

  return (
    <div
      className={`relative ${inputSizeStyles} group ${
        isFocused || value ? "input-focused" : ""
      }`}
    >
      {/* <label
          htmlFor={labelName}
          className={`  bg-grey transition-scale-all duration-300 absolute left-2  ${
            isFocused ? labelUpStyles : labelDownStyles
          } ${error.hasError ? errorLabelStyles : "text-white"} `}
        >
          {error.hasError ? error.errorMessage : labelText}
        </label> */}
      <input
        className={`w-full h-full text-white px-2 ${inputStyles} ${
          isFocused || value ? "border-white" : "border-gray-300"
        } ${error.hasError ? errorInputStyles : ""}`}
        style={{ fontSize: fontSizePx }}
        type={inputType}
        id={labelName}
        name={labelName}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
