type Props = {
  name: string;
  sets: number;
  reps: number;
};

export default function ExerciseCard({ name, sets, reps }: Props) {
  return (
    <div className="flex gap-2">
      <h3>{name}</h3>|
      <p>
        {sets} sets x {reps} reps
      </p>
      |
    </div>
  );
}
