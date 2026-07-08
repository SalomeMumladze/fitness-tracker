"use client";

import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@/src/shared/format-date";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createSchedule } from "@/app/features/schedules/actions/CreateSchedule";
import { getSchedules } from "../actions/get-schedules";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Trash2, Pencil } from "lucide-react";

type EventType = {
  id: string;
  title: string;
  start: string;
  time: string;
};

const workouts = [
  { id: "1", name: "Push Day" },
  { id: "2", name: "Pull Day" },
  { id: "3", name: "Leg Day" },
];

const times = [
  "06:00",
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
];

export default function Calendar() {
  const [events, setEvents] = useState<EventType[]>([
    {
      id: "110de77c-66ad-4fe3-a1dd-bacd0244ac9d",
      title: "Pull Day",
      start: "2026-06-24T18:00:00",
      time: "18:00",
    },
    {
      id: "b8ef2d0d-7326-4083-892c-cb2cdcfd4ee3",
      title: "Pull Day",
      start: "2026-06-24T20:00:00",
      time: "20:00",
    },
  ]);
  const s = getSchedules();
  console.log(s);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [workoutId, setWorkoutId] = useState("");
  const [time, setTime] = useState("18:00");

  // 📅 open modal
  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  // ➕ save
  async function handleSave() {
    if (!selectedDate || !workoutId || !time) return;

    const workout = workouts.find((w) => w.id === workoutId);

    const newEvent: EventType = {
      id: crypto.randomUUID(),
      title: workout?.name || "Workout",
      start: `${selectedDate}T${time}:00`,
      time,
    };

    await createSchedule({
      workoutId: "cmqii5b5z0002w1oyw6hf0mvt",
      startAt: `${selectedDate}T${time}:00`,
    });

    setEvents((prev) => [...prev, newEvent]);

    setOpen(false);
    setWorkoutId("");
    setTime("18:00");
  }

  // 🗑 delete
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // ✏️ edit (simple reopen modal later)
  const editEvent = (event: EventType) => {
    setSelectedDate(event.start.split("T")[0]);
    setTime(event.time);
    setWorkoutId("");
    setOpen(true);

    setEvents((prev) => prev.filter((e) => e.id !== event.id));
  };

  return (
    <div className="p-4 bg-card rounded-xl border">
      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Workout</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">{selectedDate}</p>

          <Select value={workoutId} onValueChange={setWorkoutId}>
            <SelectTrigger>
              <SelectValue placeholder="Select workout" />
            </SelectTrigger>
            <SelectContent>
              {workouts.map((w) => (
                <SelectItem key={w.id} value={w.id}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {times.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* inject custom renderer via FullCalendar API */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
        dateClick={handleDateClick}
        eventContent={(arg) => {
          const event = events.find((e) => e.id === arg.event.id);

          return (
            <div className="flex items-center justify-between w-full group text-xs">
              <div className="gridgap-1">
                <p className="text-[10px]">{formatDate(arg.event.startStr)}</p>
                <span>{arg.event.title}</span>
              </div>
              <div className="hidden group-hover:flex gap-1">
                <button
                  onClick={() => editEvent(event!)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Pencil size={12} />
                </button>

                <button
                  onClick={() => deleteEvent(event!.id)}
                  className="p-1 hover:bg-red-500/20 rounded"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
