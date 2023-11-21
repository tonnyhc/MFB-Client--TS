import { ExerciseSearchResponse } from "../ts/types";
import { get } from "./requester";

export async function exerciseSearch(
  exerciseNameQuery: string
): Promise<ExerciseSearchResponse>  {
  // if (!exerciseNameQuery){
  //   return 
  // }
  try {
    const data = await get(
      `workouts/search_exercise/?exercise_name=${exerciseNameQuery}`
    );
    return data
  } catch (error) {
    throw error;
  }
}
