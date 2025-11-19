// src/components/DidYouKnowSection.tsx
"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DidYouKnowSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Pie
  const pieOptions: ApexOptions = {
    labels: ["Quên thay nhớt", "Nhớ thay nhớt"],
    colors: ["#22c55e", "#0f172a"],
    theme: { mode: "dark" },
    stroke: { width: 0 },
    dataLabels: {
      style: {
        colors: ["#ffffff"],
      },
    },
    legend: {
      show: false,
    },
    chart: {
      background: "transparent",
    },
  };

  const pieSeries: ApexNonAxisChartSeries = [77, 23];

  // Bar
  const barOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
    },
    colors: ["#22c55e"],
    theme: { mode: "dark" },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      yaxis: { lines: { show: false } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["Chuẩn", "+10%", "+15%", "+20%"],
      labels: {
        style: {
          colors: ["#9ca3af"],
          fontSize: "11px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
  };

  const barSeries: ApexAxisChartSeries = [
    {
      name: "Mức tiêu hao xăng",
      data: [0, 10, 15, 20],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 bg-gradient-to-b from-[#020617] via-[#020617] to-black"
    >
      <div className="mx-auto max-w-6xl px-6 text-center text-white">
        {/* Title */}
        <div className="did-title mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Bạn có biết?</h2>
          <p className="text-xs md:text-sm text-white/70 max-w-2xl mx-auto">
            Một vài con số cho thấy vì sao việc quên bảo dưỡng xe lại gây tốn
            kém đến vậy – và MotoCare có thể giúp bạn tránh điều đó.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
          {/* PIE CHART */}
          <div className="did-item flex flex-col items-center gap-4">
            <div className="rounded-3xl bg-white/5 border border-emerald-400/20 px-4 py-4 backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.25)]">
              <ReactApexChart
                options={pieOptions}
                series={pieSeries}
                type="pie"
                width={260}
              />
            </div>
            <p className="mt-4 text-xs md:text-sm text-white/75 max-w-xs">
              Khoảng <span className="font-semibold text-emerald-400">77%</span>{" "}
              người dùng Việt không nhớ chính xác lịch thay nhớt và bảo dưỡng xe
              máy của mình.
            </p>
          </div>

          {/* x2 / x3 bubbles */}
          <div className="did-item flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-3xl md:text-4xl font-bold shadow-[0_0_40px_rgba(16,185,129,0.7)]">
                x2
              </div>
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center text-3xl md:text-4xl font-bold shadow-[0_0_45px_rgba(34,211,238,0.7)]">
                x3
              </div>
            </div>
            <p className="text-xs md:text-sm text-white/75 max-w-xs">
              Thay nhớt trễ gấp{" "}
              <span className="font-semibold text-emerald-400">2–3 lần</span>{" "}
              làm xe nóng máy, hao xăng rõ rệt và giảm tuổi thọ động cơ.
            </p>
          </div>

          {/* BAR CHART */}
          <div className="did-item flex flex-col items-center gap-4">
            <div className="rounded-3xl bg-white/5 border border-emerald-400/20 px-4 py-4 backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.25)]">
              <ReactApexChart
                options={barOptions}
                series={barSeries}
                type="bar"
                width={280}
                height={220}
              />
            </div>
            <p className="mt-4 text-xs md:text-sm text-white/75 max-w-xs">
              Lọc gió bẩn có thể làm xe{" "}
              <span className="font-semibold text-emerald-400">
                tốn thêm 10–20% xăng
              </span>{" "}
              so với khi được vệ sinh và thay định kỳ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
