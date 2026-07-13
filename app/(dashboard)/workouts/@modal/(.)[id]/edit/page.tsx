import { prisma } from "@/src/lib/prisma";
import EditWorkoutModalClient from "./EditWorkoutModalClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWorkoutModalPage({ params }: Props) {
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

  return <EditWorkoutModalClient workout={workout} />;
}
