import React from "react";
import Input from "../common/input/Input";

interface ProgramNameFormProps {
  formData: { planName: string; numberOfWorkouts: number | string};
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleBlur: React.FocusEventHandler<HTMLInputElement>;
}

const ProgramNameForm: React.FC<ProgramNameFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="mt-12 flex justify-center items-center">
      <form action="" className="text-white flex gap-3 flex-col">
        <Input
          placeholder="Program Name"
          inputName="planName"
          inputStyle="transparent"
          inputSize="full"
          inputType="text"
          onChange={handleChange}
        //   onBlur={handleBlur}
          value={formData.planName}
          isRequired={true}
        />
        <Input
          inputName="numberOfWorkouts"
          placeholder="Number of workouts"
          inputType="number"
          onChange={handleChange}
        //   onBlur={handleBlur}
          value={Number(formData.numberOfWorkouts)}
          isRequired={true}
          inputSize="full"
          inputStyle="transparent"
        />
      </form>
    </div>
  );
};

export default ProgramNameForm;
