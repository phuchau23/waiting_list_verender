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
    colors: ["#dc2626", "#f3f4f6"],
    theme: { mode: "light" },
    stroke: { width: 0 },
    dataLabels: {
      style: {
        colors: ["#ffffff", "#1f2937"],
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
    colors: ["#dc2626"],
    theme: { mode: "light" },
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
          colors: ["#6b7280"],
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
      className="py-20 md:py-24 bg-gradient-to-b from-gray-50 via-red-50/20 to-gray-50"
    >
      <div className="mx-auto max-w-6xl px-6 text-center text-gray-800">
        {/* Title */}
        <div className="did-title mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Bạn có biết?</h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
            Một vài con số cho thấy vì sao việc quên bảo dưỡng xe lại gây tốn
            kém đến vậy – và Verendar có thể giúp bạn tránh điều đó.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
          {/* PIE CHART */}
          <div className="did-item flex flex-col items-center gap-4">
            <div className="rounded-3xl bg-white border border-red-200 px-4 py-4 shadow-[0_0_40px_rgba(220,38,38,0.15)]">
              <ReactApexChart
                options={pieOptions}
                series={pieSeries}
                type="pie"
                width={260}
              />
            </div>
            <p className="mt-4 text-xs md:text-sm text-gray-600 max-w-xs">
              Khoảng <span className="font-semibold text-red-500">77%</span>{" "}
              người dùng Việt không nhớ chính xác lịch thay nhớt và bảo dưỡng xe
              máy của mình.
            </p>
          </div>

          {/* x2 / x3 bubbles */}
          <div className="did-item flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl md:text-4xl font-bold shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                x2
              </div>
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-red-400 text-white flex items-center justify-center text-3xl md:text-4xl font-bold shadow-[0_0_45px_rgba(248,113,113,0.3)]">
                x3
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 max-w-xs">
              Thay nhớt trễ gấp{" "}
              <span className="font-semibold text-red-500">2–3 lần</span>{" "}
              làm xe nóng máy, hao xăng rõ rệt và giảm tuổi thọ động cơ.
            </p>
          </div>

          {/* BAR CHART */}
          <div className="did-item flex flex-col items-center gap-4">
            <div className="rounded-3xl bg-white border border-red-100 px-4 py-4 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
              <ReactApexChart
                options={barOptions}
                series={barSeries}
                type="bar"
                width={280}
                height={220}
              />
            </div>
            <p className="mt-4 text-xs md:text-sm text-gray-600 max-w-xs">
              Lọc gió bẩn có thể làm xe{" "}
              <span className="font-semibold text-red-500">
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
