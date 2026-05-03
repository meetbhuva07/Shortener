"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#C778DD",
  "#61dafb",
  "#ff7300",
  "#00c49f",
  "#ffbb28",
  "#ff4d4f",
];

export default function Device({ stats = [], isAnimationActive = true }) {

  const deviceCount = stats.reduce((acc, item) => {
    const key = item.device || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(deviceCount).reduce((a, b) => a + b, 0);

  const data = Object.entries(deviceCount).map(([name, value]) => ({
    name,
    value,
  }));

  // 🔥 Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      const percent = ((d.value / total) * 100).toFixed(1);

      return (
        <div className="bg-[#1f2937] border border-gray-600 px-2 py-1 rounded text-white text-xs">
          <p>{d.name}</p>
          <p>{d.value} ({percent}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[260px]"> {/* 👈 container thoda controlled */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="100%"   // 🔥 BIG PIE
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}