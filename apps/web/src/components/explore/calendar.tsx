import React, { FormEvent, useState } from "react";
import dayjs from "dayjs";
import Dropdown from "./dropdown";

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
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [month, setMonth] = useState(monthNames[selectedDate.month()]);
  const daysInMonth = selectedDate.daysInMonth();
  const firstDayOfMonth = selectedDate.startOf("month");
  const startingDay = firstDayOfMonth.day();
  const [year, setYear] = useState(selectedDate.year());

  const handleMonthChange = (month: number) => {
    setSelectedDate(selectedDate.set("month", month));
  };

  const handleYearChange = (year: number) => {
    setSelectedDate(selectedDate.set("year", year));
  };

  return (
    <div className="hidden md:block p-4">
      <div className="flex mb-4">
        <div className="mr-2 ">
          <Dropdown
            items={monthNames}
            value={month}
            onChange={(e) => {
              setMonth((month) => e);
              setSelectedDate(selectedDate.set("month", monthNames.indexOf(e)));
            }}
          />
        </div>
        <div className="mr-2 ">
          <Dropdown
            items={[dayjs().year().toString()]}
            value={year.toString()}
            onChange={(e) => {
              setYear(Number(e));
              setSelectedDate(selectedDate.set("year", Number(e)));
            }}
          />
        </div>
      </div>
      <div className="flex justify-around mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
          return (
            <p key={index} className="text-neutral-400">
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
          <div key={`day-${i}`} className="text-center">
            <div
              className={` text-sm w-6 h-6 m-auto text-neutral-300 ${
                Number(dayjs().date()) == i + 1
                  ? "bg-green-500 rounded-full text-white"
                  : ""
              }`}
            >
              {i + 1}
            </div>
            <div
              className={`${
                i + 1 < Number(dayjs().date())
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
