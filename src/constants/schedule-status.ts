export const SCHEDULE_STATUS = {
  PLANNED: {
    label: "Planned",
    color: "bg-blue-500",
  },

  COMPLETED: {
    label: "Completed",
    color: "bg-green-500",
  },

  MISSED: {
    label: "Missed",
    color: "bg-red-500",
  },

  CANCELLED: {
    label: "Cancelled",
    color: "bg-gray-500",
  },
} as const;
