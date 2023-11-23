import React, {
  useContext,
  useState,
  useDeferredValue,
  useEffect,
} from "react";

import { HiPlusCircle } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";

import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import { CreateCustomWorkoutPlanContext } from "../../../contexts/CreateCustomWorkoutContext";
import { ExerciseSearch, ExerciseSet } from "../../../ts/types";
import ExerciseCreationSet from "./ExerciseCreationSet";
import { useQuery } from "react-query";
import { exerciseSearch } from "../../../services/exerciseServices";
import ExerciseSearchPopUp from "./ExerciseSearchPopUp";

type Exercise = {
  id: string | number;
  name: string;
  information: string;
  cover_photo: string;
  sets: ExerciseSet[];
};

interface ExerciseCreationCardProps {
  exercise: Exercise;
  exerciseIndex: number;
  workoutIndex: number;
  isOpened: boolean;
  openCardClick: () => void;
}

const ExerciseCreationCard: React.FC<ExerciseCreationCardProps> = ({
  exercise,
  exerciseIndex,
  workoutIndex,
  isOpened,
  openCardClick,
}) => {
  const { dispatch } = useContext(CreateCustomWorkoutPlanContext);
  const [exerciseNameSearch, setExerciseNameSearch] = useState("");
  const defferedExerciseNameSearch = useDeferredValue(exerciseNameSearch);
  const sets = exercise.sets;

  const { data, error, isLoading, refetch } = useQuery(
    ["exercise", defferedExerciseNameSearch],
    () => {
      if (!defferedExerciseNameSearch) {
        return;
      }
      return exerciseSearch(defferedExerciseNameSearch);
    },
    {
      onError: (error) => alert(error),
    }
  );

  useEffect(() => {
    refetch();
  }, [defferedExerciseNameSearch]);

  // if (isLoading) {
  //   console.log("is loading...");
  // }

  // if (error) {
  //   // alert(error);
  // }

  function onSelectExercise(selectedExercise: ExerciseSearch) {
    dispatch({
      type: "selectExercise",
      payload: {
        selectedExercise: selectedExercise,
        workoutIndex: workoutIndex,
        exerciseIndex: exerciseIndex,
      },
    });
    setExerciseNameSearch("");
  }
  function addSet() {
    dispatch({
      type: "addSetToExercise",
      payload: { workoutIndex: workoutIndex, exerciseIndex: exerciseIndex },
    });
  }

  function deleteExercise(): void {
    dispatch({
      type: "removeExerciseFromWorkout",
      payload: { workoutIndex: workoutIndex, exerciseIndex: exerciseIndex },
    });
  }

  const openedCardClassNames = isOpened ? "bg-light-grey" : "bg-transparent";

  return (
    <article
      onClick={openCardClick}
      className={`flex flex-col items-center rounded-t-2xl py-3 px-2 w-10/12 rounded overflow-auto ${openedCardClassNames}`}
    >
      {/* Exercise name */}
      <div className="w-full relative">
        <div className="flex items-center">
          <div className="w-[90%]">
            <Input
              placeholder="Exercise Name"
              inputName="exerciseName"
              inputType="text"
              value={exerciseNameSearch ? exerciseNameSearch : exercise.name}
              isRequired={true}
              onChange={(e) => setExerciseNameSearch(e.target.value)}
              inputSize="full"
              inputStyle="transparent"
            />
          </div>
          <p>
            <Button
              onClick={deleteExercise}
              color="transparent"
              icon={<FaTrash className="bg-red" />}
              type="delete"
              shape="rectangular"
              width="unset"
            />
          </p>
        </div>
        {exerciseNameSearch && (
          <ExerciseSearchPopUp
            exercises={data?.exercises || []}
            exercises_by_user={data?.exercises_by_user || []}
            onSelectExercise={onSelectExercise}
            isLoadingSearch={isLoading}
          />
        )}
      </div>
      {isOpened && (
        <>
          {sets.map((set, index) => (
            <ExerciseCreationSet
              key={index}
              set={set}
              setIndex={index}
              exerciseIndex={exerciseIndex}
              workoutIndex={workoutIndex}
            />
          ))}
          <Button
            text="Add Set"
            color="transparent"
            onClick={addSet}
            id="addSetBtn"
            icon={<HiPlusCircle />}
            reverseOrder={true}
            shape="rectangular"
            type="default"
            width="unset"
          />
        </>
      )}
    </article>
  );
};

export default ExerciseCreationCard;
