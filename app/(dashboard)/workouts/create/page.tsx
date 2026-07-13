import { WorkoutForm } from "../components/WorkoutForm";

export default function CreateWorkoutPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <WorkoutForm
        mode="create"
        onSubmit={async () => {}}
        onCancel={() => {}}
      />
    </div>
  );
}
