import React, { useState } from "react";

//Key names in circle of fifths order (position 0 = C)
const keys = [
  "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"
];

//Calculate positions around a circle for 12 keys
const radius = 150;
const centerX = 160;
const centerY = 160;

function CircleOfFifths() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <svg width={320} height={320} style={{ border: "1px solid #ccc" }}>
      {/* Circle background */}
      <circle cx={centerX} cy={centerY} r={radius} fill="#f0f0f0" />

      {/* Keys positioned around the circle */}
      {keys.map((key, index) => {
        const angle = (index / keys.length) * 2 * Math.PI - Math.PI / 2; // start at top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const isSelected = key === selectedKey;

        return (
          <g
            key={key}
            onClick={() => setSelectedKey(key)}
            style={{ cursor: "pointer" }}
          >
            {/* Circle for each key */}
            <circle
              cx={x}
              cy={y}
              r={isSelected ? 20 : 15}
              fill={isSelected ? "#4caf50" : "#2196f3"}
              stroke="#333"
              strokeWidth={isSelected ? 3 : 1}
            />
            {/* Key text */}
            <text
              x={x}
              y={y + 5} // rough center vertically
              fontSize="14"
              fontWeight="bold"
              fill="#fff"
              textAnchor="middle"
              pointerEvents="none"
            >
              {key}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default CircleOfFifths;
