import React, { useContext, useState } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import Button from "../components/common/button/Button";
import useFormState from "../hooks/useFormState";
import ProgramNameForm from "../components/custom-program/ProgramNameForm";
import { CreateCustomWorkoutPlanContext } from "../contexts/CreateCustomWorkoutContext";
import WorkoutsCreationForm from "../components/custom-program/WorkoutsCreationForm";
import { useMutation } from "react-query";
import { createWorkoutPlanRequest } from "../services/workoutServices";

const CustomProgramCreate: React.FC = () => {
  const { workoutPlan, dispatch } = useContext(CreateCustomWorkoutPlanContext);
  const [programNameWorkoutsCount, errors, handleChange, handleBlur] =
    useFormState({
      planName: "",
      numberOfWorkouts: "",
    });
  const [currStep, setCurrStep] = useState(0);
  const {mutate, isLoading, isError, error} = useMutation(
    () => createWorkoutPlanRequest(workoutPlan),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => {
        alert(error)
      },
    }
  )

  const changeStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    if (id === "next") {
      if (currStep === 1){
        mutate()
      }

      setCurrStep((currStep) => (currStep += 1));
      currStep === 0 &&
        dispatch({
          type: "initializeProgram",
          payload: programNameWorkoutsCount,
        });
    } else {
      if (currStep === 0) {
        return;
      }
      setCurrStep((currStep) => (currStep -= 1));
    }
  };

  return (
    <div className="flex items-center h-full flex-col gap-5 justify-between">
      <div className="min-h-4/5 w-full flex-1">
        {currStep === 0 && (
          <ProgramNameForm
            handleChange={handleChange}
            formData={{
              planName: programNameWorkoutsCount.planName,
              numberOfWorkouts: programNameWorkoutsCount.numberOfWorkouts,
            }}
          />
        )}
        {currStep === 1 && <WorkoutsCreationForm />}
      </div>

      <div className="flex gap-3">
        {currStep > 0 && (
          <Button
            onClick={changeStep}
            icon={<MdOutlineNavigateBefore style={{ color: "#fff" }} />}
            id="back"
            reverseOrder={true}
            color="red"
            text="Back"
            shape="rectangular"
            type="default"
            width="unset"
          />
        )}
        <Button
          onClick={changeStep}
          icon={<MdOutlineNavigateNext style={{ color: "#fff" }} />}
          id="next"
          color="red"
          text={currStep >= 1 ? "Submit" : "Next"}
          shape="rectangular"
          type="default"
          width="unset"
        />
      </div>
    </div>
  );
};

export default CustomProgramCreate;
