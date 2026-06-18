import ExerciseActions from "./ExerciseActions";

export default function ExerciseCard({ exercise, onEdit }: any) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-xl hover:shadow transition">
      <div>
        <p className="font-semibold">{exercise.name}</p>

        <p className="text-sm text-gray-500">
          {exercise.sets} sets × {exercise.reps} reps
        </p>
      </div>

      <ExerciseActions exercise={exercise} onEdit={onEdit} />
    </div>
  );
}
