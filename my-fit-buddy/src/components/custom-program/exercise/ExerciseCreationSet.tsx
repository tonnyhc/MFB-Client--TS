import { MouseEventHandler, SyntheticEvent, useContext } from "react";

import { HiMinusCircle } from "react-icons/hi2";

import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import { CreateCustomWorkoutPlanContext } from "../../../contexts/CreateCustomWorkoutContext";
import { ExerciseSet } from "../../../ts/types";

interface ExerciseCreationSetProps {
  set: ExerciseSet;
  setIndex: string | number;
  exerciseIndex: string | number;
  workoutIndex: string | number;
}

const ExerciseCreationSet: React.FC<ExerciseCreationSetProps> = ({
  set,
  setIndex,
  exerciseIndex,
  workoutIndex,
}) => {
  const { dispatch } = useContext(CreateCustomWorkoutPlanContext);

  function changeExerciseSetWeight(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    dispatch({
      type: "changeSetWeight",
      payload: {
        weight: value,
        setIndex: setIndex,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
  }

  function changeExerciseSetReps(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    dispatch({
      type: "changeSetReps",
      payload: {
        reps: value,
        setIndex: setIndex,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
  }

  function changeExerciseMinReps(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    dispatch({
      type: "changeSetMinReps",
      payload: {
        minReps: value,
        setIndex: setIndex,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
  }

  function changeExerciseSetProperty(
    actionType: string,
    propertyName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;
    dispatch({
      type: actionType,
      payload: {
        [propertyName]: value,
        setIndex: setIndex,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
  }

  function removeSet(e: SyntheticEvent): void {
    dispatch({
      type: "removeSetFromExercise",
      payload: { exerciseIndex, setIndex, workoutIndex },
    });
  }
  return (
    <div className="w-full py-2 border-b-2 border-border-grey">
      <div className="flex justify-between items-center  px-1">
        <h3 className="text-xl">Set {Number(setIndex) + 1}</h3>
        <Button
          color="transparent"
          onClick={removeSet}
          id="removeSetBtn"
          icon={<HiMinusCircle />}
          reverseOrder={true}
          shape="rectangular"
          type="delete"
          width="unset"
        />
      </div>
      <div className="flex w-full gap-2">
        <Input
          placeholder="Weight"
          inputName="weight"
          fontSizePx="12px"
          inputType="number"
          value={set.weight}
          inputSize="full"
          onChange={(e) => changeExerciseSetProperty('changeSetWeight', 'weight', e)}
          inputStyle="transparent"
          isRequired={true}
        />
        <Input
          placeholder="Reps"
          fontSizePx="12px"
          inputName="reps"
          inputType="number"
          value={set.reps}
          inputSize="full"
          onChange={(e) => changeExerciseSetProperty('changeSetReps', 'reps', e)}
          inputStyle="transparent"
          isRequired={true}
        />

        <Input
          placeholder="Min Reps"
          fontSizePx="12px"
          inputName="minReps"
          inputType="number"
          onChange={(e) => changeExerciseSetProperty('changeSetMinReps', 'minReps', e)}
          value={set.minReps}
          inputSize="full"
          inputStyle="transparent"
          isRequired={true}
        />
        <Input
          placeholder="Max Reps"
          fontSizePx="12px"
          inputName="maxReps"
          inputType="number"
          value={set.maxReps}
          inputSize="full"
          onChange={(e) => changeExerciseSetProperty('changeSetMaxReps', 'maxReps', e)}
          inputStyle="transparent"
          isRequired={true}
        />
      </div>
    </div>
  );
};

export default ExerciseCreationSet;
