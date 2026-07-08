export type ScheduleStatus = "PLANNED" | "COMPLETED" | "MISSED" | "CANCELLED";

export type Schedule = {
  id: string;
  workoutId: string;
  startAt: string;
  status: ScheduleStatus;
  notes?: string;
};
