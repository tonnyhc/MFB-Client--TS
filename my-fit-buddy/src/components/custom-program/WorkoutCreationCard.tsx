import React, { useContext, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import ExerciseCreationCard from "./exercise/ExerciseCreationCard";
import { CreateCustomWorkoutPlanContext } from "../../contexts/CreateCustomWorkoutContext";

interface WorkoutCreationCardProps {
  workout: { workoutName: string; exercises: Array<any> };
  arrayIndex: number;
}

const WorkoutCreationCard: React.FC<WorkoutCreationCardProps> = ({ workout, arrayIndex }) => {
  const { workoutPlan, dispatch } = useContext(CreateCustomWorkoutPlanContext);
  const exercises = workout.exercises;
  const [openedExercisesCardIndex, setOpenedExerciseCardIndex] = useState<number | null>(null);

  const onAddExercise = () => {
    dispatch({ type: "addExerciseToWorkout", payload: arrayIndex });
  };

  const openExerciseCard = (index: number) => {
    setOpenedExerciseCardIndex(index);
  };

  const onChangeWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({
      type: "changeWorkoutName",
      payload: { index: arrayIndex, name: e.target.value },
    });
  };

  return (
    <article className="w-screen py-4 gap-3 flex flex-col justify-start items-center " key={`workout-${arrayIndex + 1}`}>
      <div className="min-h-[50px]">
        <Input
          inputName={`workout${arrayIndex + 1}`}
          placeholder={`Workout ${arrayIndex + 1}`}
          inputType="text"
          inputStyle='transparent'
          value={workout.workoutName}
          isRequired={true}
          onChange={onChangeWorkoutName}
          inputSize="xxl"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        {exercises.map((exercise, index) => (
          <ExerciseCreationCard
            exercise={exercise}
            workoutIndex={arrayIndex}
            exerciseIndex={index}
            isOpened={index === openedExercisesCardIndex}
            openCardClick={() => openExerciseCard(index)}
            key={index}
          />
        ))}
      </div>

      <Button
        text="Exercise"
        color="grey"
        onClick={onAddExercise}
        id="addExerciseBtn"
        icon={<HiPlusSm />}
        reverseOrder={true}
        shape="rectangular"
        type="default"
        width="unset"
      />
    </article>
  );
};

export default WorkoutCreationCard;
