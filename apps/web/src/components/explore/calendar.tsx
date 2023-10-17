import React, { FormEvent, useState } from "react";
import dayjs from "dayjs";
const dateToday = dayjs();
const Calendar = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedDate, setSelectedDate] = useState(dateToday);
  const [month, setMonth] = useState(monthNames[selectedDate.month()]);
  const daysInMonth = selectedDate.daysInMonth();
  const firstDayOfMonth = selectedDate.startOf("month");
  const startingDay = firstDayOfMonth.day();

  const handleMonthChange = (month: number) => {
    if (month >= 0 && month <= dateToday.month()) {
      setSelectedDate(() => selectedDate.set("month", month));
      setMonth(() => monthNames[month]);
    }
  };

  return (
    <div className="py-4">
      <div className="flex mb-4 w-full justify-between">
        <div className="mr-2">{month}</div>
        <div className="flex gap-4">
          <button
            className="text-neutral-300 text-sm disabled:text-neutral-500"
            disabled={selectedDate.month() == 0}
            onClick={() => {
              handleMonthChange(selectedDate.month() - 1);
            }}
          >
            {"<"}
          </button>
          <button
            className="text-neutral-300 text-sm disabled:text-neutral-500"
            disabled={selectedDate.month() == dateToday.month()}
            onClick={() => {
              handleMonthChange(selectedDate.month() + 1);
            }}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
          return (
            <p key={index} className="text-neutral-400 w-6 h-6 text-center">
              {day}
            </p>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startingDay }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => (
          <div key={`day-${i}`} className="text-center cursor-pointer w-6 h-6">
            <div
              className={`w-5 h-5 text-center text-sm m-auto text-neutral-300 ${
                Number(dayjs().date()) == i + 1 &&
                month == monthNames[dayjs().month()]
                  ? "bg-blue-600 rounded-full text-white"
                  : ""
              }`}
            >
              {i + 1}
            </div>
            <div
              className={`${
                i + 1 < Number(dayjs().date()) ||
                month != monthNames[dayjs().month()]
                  ? " rounded-full bg-red-600 w-[5px] h-[5px] mx-auto"
                  : "hidden"
              }
              } `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
