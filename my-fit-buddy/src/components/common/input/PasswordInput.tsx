import { ChangeEvent, FocusEvent, MouseEventHandler, ReactNode, useState } from "react";
import Input from "./Input";

import { AiFillEyeInvisible, AiFillEye, AiFillLock } from "react-icons/ai";

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => string | null;
}

interface VisibilityIconProps {
    visibility: boolean,
    onClick: MouseEventHandler<HTMLDivElement>
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({visibility, onClick}) => {
    const showPassIcon = <AiFillEye />
    const hidePasswordIcon = <AiFillEyeInvisible />
    return (
        <div className="text-white cursor-pointer z-50 text-xl" onClick={onClick}>
            {visibility ? hidePasswordIcon : showPassIcon}
        </div>
    );
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="w-full relative">
      <Input
        labelText="Password"
        placeholder="Password"
        labelName="password"
        inputType={visible ? "text" : "password"}
        value={value}
        isRequired={true}
        onChange={onChange}
        onBlur={onBlur}
        inputSize="full"
        inputStyle="transparent"
        rightIcon={<VisibilityIcon visibility={visible}  onClick={() => setVisible((oldVisible) => !oldVisible)}/>}
        leftIcon={<AiFillLock />}
        //   errorMessage={errors.email}
      />
    </div>
  );
};

export default PasswordInput;
