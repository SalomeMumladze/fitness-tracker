import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import EditWorkoutClient from "./EditWorkoutClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWorkoutPage({ params }: Props) {
  const { id } = await params;

  const workout = await prisma.workout.findUnique({
    where: {
      id,
    },

    include: {
      exercises: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-8">
      <EditWorkoutClient workout={workout} />
    </div>
  );
}
