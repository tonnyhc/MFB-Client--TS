import { post } from "./requester";


export async function createWorkoutPlanRequest(body: Record<string, any>):Promise<any>{
    try{
        const data = await post('workouts/create-workout-plan/', body);
        return data;
    } catch(e){
        throw e
    }
}