import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import CustomProgramReducer, { ProgramState } from '../reducers/CustomProgramReducer';

interface CreateCustomWorkoutPlanContextProps {
  workoutPlan: ProgramState;
  dispatch: Dispatch<any>; // Replace 'any' with your specific action types if available
}

export const CreateCustomWorkoutPlanContext = createContext<CreateCustomWorkoutPlanContextProps | undefined>(undefined);

interface CreateCustomWorkoutPlanProviderProps {
  children: ReactNode;
}

const CreateCustomWorkoutPlanProvider: React.FC<CreateCustomWorkoutPlanProviderProps> = ({ children }) => {
  const defaultWorkoutPlanState: ProgramState = {
    planName: "",
    workouts: [],
    numberOfWorkouts: 0,
  };

  const [workoutPlan, dispatch] = useReducer(
    CustomProgramReducer,
    defaultWorkoutPlanState
  );

  const context: CreateCustomWorkoutPlanContextProps = {
    workoutPlan,
    dispatch,
  };

  return (
    <CreateCustomWorkoutPlanContext.Provider value={context}>
      {children}
    </CreateCustomWorkoutPlanContext.Provider>
  );
};

export default CreateCustomWorkoutPlanProvider;
