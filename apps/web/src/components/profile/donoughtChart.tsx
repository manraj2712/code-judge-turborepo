'use client'
import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const DonutProgressBar = ({Total_Questions,questions_completed}:any) => {
  const chartRef = useRef(null);
  const progress = ((Total_Questions - questions_completed) / Total_Questions) * 100;

  useEffect(() => {
    const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext("2d");

    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [],
          datasets: [
            {
              data: [progress, 100 - progress],
              backgroundColor: ["blue", "white"],
            },
          ],
        },
        options: {
          cutoutPercentage: 90,
          responsive: true,
          maintainAspectRatio: false,
          tooltips: { enabled: false },
        },
      });
    }
  }, [progress]);

  return (
    <div className="relative h-32 w-[6rem]" style={{ maxWidth: "8rem" }}>
      <canvas ref={chartRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center ">
        <div className="text-xl font-semibold mt-2 text-neutral-200">
          {questions_completed}
        </div>
        <div className="text-neutral-400 text-sm">solved</div>
      </div>
    </div>
  );
};

export default DonutProgressBar;
