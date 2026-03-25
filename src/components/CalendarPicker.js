import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function DatePickerInput() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(date);
            setOpen(false);
          }}
          className={`p-2 rounded-xl text-sm transition
            ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200"}
            ${isToday ? "border border-blue-500" : ""}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
     <div className="relative w-72">

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm hover:border-gray-400"
      >
        <span className="text-gray-700 text-sm">
          {selectedDate ? selectedDate.toDateString() : "Select a date"}
        </span>
        <Calendar size={18} />
      </div>

      {/* Calendar Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-lg p-4 z-50">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 ">
            <button onClick={prevMonth}>
              <ChevronLeft />
            </button>
            <h2 className="font-semibold text-sm">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={nextMonth}>
              <ChevronRight />
            </button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
            {daysOfWeek.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
}
