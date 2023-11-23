import { ExerciseSet } from "../ts/types";

// Function to update an array element at a specific index
function updateArrayElement<T>(
  array: T[],
  index: number,
  updateFn: (element: T) => T
): T[] {
  return [
    ...array.slice(0, index),
    updateFn(array[index]),
    ...array.slice(index + 1),
  ];
}

// Function to update a workout's exercise array
function updateWorkoutExercises<T>(
  workouts: T[],
  workoutIndex: number,
  updateFn: (workout: T) => T
): T[] {
  const updatedWorkouts = [...workouts];
  updatedWorkouts[workoutIndex] = updateFn(updatedWorkouts[workoutIndex]);
  return updatedWorkouts;
}

function handleEditSetProperty(
  state: ProgramState,
  action: Action,
  propertyName: string,
  updateFn: (set: ExerciseSet, value: any) => ExerciseSet
): ProgramState {
  const propertyValue = action.payload[propertyName];
  const workoutIndex = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;
  const setIndex = action.payload.setIndex;

  const updateExerciseSetsArray = (exercise: Exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set, index) =>
      index === setIndex ? updateFn(set, propertyValue) : set
    ),
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          updateExerciseSetsArray
        ),
      })
    ),
  };
}

type ActionHandlers = {
  [key: string]: (state: ProgramState, action: Action) => ProgramState;
};

type Exercise = { name: string; sets: ExerciseSet[] };
type Workout = { workoutName: string; exercises: Exercise[] };
export type ProgramState = {
  planName: string;
  workouts: Workout[];
  numberOfWorkouts: number;
};

export type Action = {
  type:
    | "initializeProgram"
    | "changeWorkoutName"
    | "addExerciseToWorkout"
    | "removeExerciseFromWorkout"
    | "changeExerciseName"
    | "selectExercise"
    | "addSetToExercise"
    | "removeSetFromExercise"
    | "changeSetWeight"
    | "changeSetReps"
    | "changeSetMinReps"
    | "changeSetMaxReps"
    | "default";
  payload?: any;
};

const actionHandlers: ActionHandlers = {
  initializeProgram: handleInitializeProgram,
  changeWorkoutName: handleChangeWorkoutName,
  addExerciseToWorkout: handleAddExerciseToWorkout,
  removeExerciseFromWorkout: handleRemoveExerciseFromWorkout,
  changeExerciseName: handleChangeExerciseName,
  selectExercise: handleSelectExercise,
  addSetToExercise: handleAddSetToExercise,
  removeSetFromExercise: handleRemoveSetFromExercise,
  changeSetWeight: handleEditSetWeight,
  changeSetReps: handleEditSetReps,
  changeSetMinReps: handleEditSetMinReps,
  changeSetMaxReps: handleEditSetMaxReps,
  default: handleDefault,
};

function CustomProgramReducer(
  state: ProgramState,
  action: Action
): ProgramState {
  const handler = actionHandlers[action.type] || actionHandlers.default;
  return handler(state, action);
}

function handleInitializeProgram(
  state: ProgramState,
  action: Action
): ProgramState {
  const payload = action.payload;
  const newWorkoutPlanState: ProgramState = {
    planName: payload.planName,
    workouts: Array.from({ length: Number(payload.numberOfWorkouts) }, () => ({
      workoutName: "",
      exercises: [],
    })),
    numberOfWorkouts: Number(payload.numberOfWorkouts),
  };
  return newWorkoutPlanState;
}

function handleChangeWorkoutName(
  state: ProgramState,
  action: Action
): ProgramState {
  const name = action.payload.name;
  const index = action.payload.index;
  const updateWorkoutName = (workout: Workout) => ({
    ...workout,
    workoutName: name,
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(state.workouts, index, updateWorkoutName),
  };
}

function handleAddExerciseToWorkout(
  state: ProgramState,
  action: Action
): ProgramState {
  const newExercise = {
    name: "",
    sets: [{ weight: "", reps: "", minReps: "", maxReps: "" }],
  };
  const workoutIndexToAddExercise = action.payload;
  const updateWorkoutExercisesArray = (workout: Workout): Workout =>
    ({
      ...workout,
      exercises: [...workout.exercises, newExercise],
    } as Workout);

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToAddExercise,
      updateWorkoutExercisesArray
    ),
  };
}

function handleRemoveExerciseFromWorkout(
  state: ProgramState,
  action: Action
): ProgramState {
  const workoutIndex = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;

  const removeExerciseFromArray = (exercises: Exercise[]) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(Number(exerciseIndex), 1);
    return updatedExercises;
  };

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: removeExerciseFromArray(workout.exercises),
      })
    ),
  };
}

function handleChangeExerciseName(
  state: ProgramState,
  action: Action
): ProgramState {
  const newExerciseName = action.payload.name;
  const exerciseIndexToChangeName = action.payload.exerciseIndex;
  const workoutIndexToChangeExerciseName = action.payload.workoutIndex;

  const updateExerciseName = (exercise: Exercise) => ({
    ...exercise,
    name: newExerciseName,
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToChangeExerciseName,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndexToChangeName,
          updateExerciseName
        ),
      })
    ),
  };
}

function handleSelectExercise(
  state: ProgramState,
  action: Action
): ProgramState {
  const { selectedExercise, workoutIndex, exerciseIndex } = action.payload;

  const updateExercise = (exercise: Exercise) => ({
    ...selectedExercise,
    sets: [{ weight: "", reps: "", minReps: "", maxReps: "" }],
  });

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          updateExercise
        ),
      })
    ),
  };
}

function handleAddSetToExercise(
  state: ProgramState,
  action: Action
): ProgramState {
  const newSet = { weight: "", reps: "", minReps: "", maxReps: "" };
  const workoutIndexToAddSet = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;

  const updateExerciseSetsArray = (exercise: Exercise): Exercise =>
    ({
      ...exercise,
      sets: [...exercise.sets, newSet],
    } as Exercise);

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndexToAddSet,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          updateExerciseSetsArray
        ),
      })
    ),
  };
}

function handleRemoveSetFromExercise(
  state: ProgramState,
  action: Action
): ProgramState {
  const workoutIndex = action.payload.workoutIndex;
  const exerciseIndex = action.payload.exerciseIndex;
  const setIndex = action.payload.setIndex;

  const removeSetFromExerciseArray = (exercise: Exercise) => {
    const updatedSets = [...exercise.sets];
    updatedSets.splice(setIndex, 1);
    return { ...exercise, sets: updatedSets };
  };

  return {
    ...state,
    workouts: updateWorkoutExercises(
      state.workouts,
      workoutIndex,
      (workout) => ({
        ...workout,
        exercises: updateArrayElement(
          workout.exercises,
          exerciseIndex,
          removeSetFromExerciseArray
        ),
      })
    ),
  };
}

function handleEditSetWeight(
  state: ProgramState,
  action: Action
): ProgramState {

  return handleEditSetProperty(state, action, "weight", (set, weight) => ({
    ...set,
    weight,
  }));
}

function handleEditSetReps(state: ProgramState, action: Action): ProgramState {

  return handleEditSetProperty(state, action, "reps", (set, reps) => ({
    ...set,
    reps,
  }));
}

function handleEditSetMinReps(
  state: ProgramState,
  action: Action
): ProgramState {
  return handleEditSetProperty(state, action, "minReps", (set, minReps) => ({
    ...set,
    minReps,
  }));
}
function handleEditSetMaxReps(
  state: ProgramState,
  action: Action
): ProgramState {
  return handleEditSetProperty(state, action, "maxReps", (set, maxReps) => ({
    ...set,
    maxReps,
  }));
}

function handleDefault(state: ProgramState): ProgramState {
  return state;
}

export default CustomProgramReducer;
