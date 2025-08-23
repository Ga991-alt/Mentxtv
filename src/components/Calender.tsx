import { useState } from "react";

interface CalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  endDate?: string; // optional prop, defaults to today + 30 days
}

export default function Calendar({
  selectedDate,
  onSelect,
  endDate,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // default endDate = 30 days from today if not provided
  const subscriptionEnd = endDate
    ? new Date(endDate)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  subscriptionEnd.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 = Sunday

  const handlePrevMonth = () => {
    if (
      year > today.getFullYear() ||
      (year === today.getFullYear() && month > today.getMonth())
    ) {
      setCurrentMonth(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (
      year < subscriptionEnd.getFullYear() ||
      (year === subscriptionEnd.getFullYear() &&
        month < subscriptionEnd.getMonth())
    ) {
      setCurrentMonth(new Date(year, month + 1, 1));
    }
  };

  const handleSelect = (day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    if (date < today || date > subscriptionEnd) return; // block outside valid range

    const dateStr = date.toISOString().split("T")[0];
    onSelect(dateStr);
  };

  const selected = selectedDate ? new Date(selectedDate) : null;

  const isPrevDisabled =
    year === today.getFullYear() && month === today.getMonth();
  const isNextDisabled =
    year === subscriptionEnd.getFullYear() &&
    month === subscriptionEnd.getMonth();

  return (
    <div className="w-full max-w-md mx-auto bg-white border rounded-xl shadow-sm p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={handlePrevMonth}
          disabled={isPrevDisabled}
          className={`px-2 py-1 rounded ${
            isPrevDisabled
              ? "text-gray-300 cursor-not-allowed invisible"
              : "hover:bg-gray-100"
          }`}
        >
          ◀
        </button>
        <h2 className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          disabled={isNextDisabled}
          className={`px-2 py-1 rounded ${
            isNextDisabled
              ? "text-gray-300 cursor-not-allowed invisible"
              : "hover:bg-gray-100"
          }`}
        >
          ▶
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);

          const dateStr = date.toISOString().split("T")[0];
          const isSelected =
            selected?.toDateString() === new Date(dateStr).toDateString();
          const isToday = today.toDateString() === date.toDateString();

          const isDisabled = date < today || date > subscriptionEnd;

          return (
            <div
              key={day}
              onClick={() => !isDisabled && handleSelect(day)}
              className={`p-2 rounded-full transition ${
                isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-100"
              } ${isSelected ? "bg-green-600 text-white" : ""} ${
                !isSelected && isToday
                  ? "border border-green-500 text-green-600"
                  : ""
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
