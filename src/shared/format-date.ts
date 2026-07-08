import { format } from "date-fns";

export type DateFormat =
  | "dd/MM/yyyy"
  | "dd MMM yyyy"
  | "EEEE"
  | "EEEE, dd MMMM yyyy"
  | "HH:mm";

export const formatDate = (
  date: Date | string,
  formatString: DateFormat = "dd MMM yyyy",
) => {
  return format(new Date(date), formatString);
};
