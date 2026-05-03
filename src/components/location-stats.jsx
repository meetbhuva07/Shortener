"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LocationLineChart({ stats = [] }) {

  const cityCount = stats.reduce((acc, item) => {
    const city = item.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(cityCount).reduce((a, b) => a + b, 0);

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
    total,
  }));

  // 🔥 Compact Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const total = payload[0].payload.total;
      const percent = ((value / total) * 100).toFixed(1);

      return (
        <div className="bg-[#1f2937] border border-gray-600 px-2 py-1 rounded text-white text-xs">
          <p>{label}</p>
          <p>{value} ({percent}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[220px]"> {/* 👈 HEIGHT SMALL */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={cities} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          {/* 🔥 Small Labels */}
          <XAxis
            dataKey="city"
            tick={{ fill: "#aaa", fontSize: 10 }}
            angle={-20}
            textAnchor="end"
            interval={0}
            height={50}
          />

          <YAxis
            tick={{ fill: "#aaa", fontSize: 10 }}
            width={30}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* 🔥 Thin Line */}
          <Line
            type="monotone"
            dataKey="count"
            stroke="#C778DD"
            strokeWidth={1.5}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 