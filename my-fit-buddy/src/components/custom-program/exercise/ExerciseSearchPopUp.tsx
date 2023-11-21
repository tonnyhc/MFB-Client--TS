import { ExerciseSearch } from "../../../ts/types";
import CommicBubble from "../../common/commic-bubble/CommicBubble";

interface ExerciseSearchPopUpProps {
  onSelectExercise: (selectedExercise: ExerciseSearch) => void;
  exercises: ExerciseSearch[];
  exercises_by_user: ExerciseSearch[];
}

const ExerciseSearchPopUp: React.FC<ExerciseSearchPopUpProps> = ({
  onSelectExercise,
  exercises,
  exercises_by_user,
}) => {
  return (
    <div className="absolute z-10 w-full h-10 text-white">
      <CommicBubble>
        <div className="flex justify-between items-center border-b-2 border-white text-sm">
          <p>Exercises</p>
          <p>Your Exercises</p>
        </div>
        <div>
          {exercises_by_user.map((exercise) => (
            <article
              key={exercise.id}
              onClick={(e) => onSelectExercise(exercise)}
              className="h-20 flex gap-2 cursor-pointer border-b-2 border-white px-1 py-2"
            >
              <div className="w-[40%] h-full">
                <img
                  className="w-full h-full object-contain"
                  src={exercise.cover_photo}
                  alt=""
                />
              </div>
              <div>
                <p className="text-sm">{exercise.name}</p>
                <p className="text-xs text-gray-400">{exercise.information}</p>
              </div>
            </article>
          ))}
        </div>
      </CommicBubble>
    </div>
  );
};

export default ExerciseSearchPopUp;
