import React, { useState } from "react";
import { Key, MODES } from "../utils/key";  // adjust path as needed

const keys = [
  "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"
];

const radius = 150;
const centerX = 160;
const centerY = 160;

function CircleOfFifths() {
  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(0);

  const keyInstance = new Key(selectedKey, 0);

  // getMode returns array of notes for the current mode
  const modeNotes = keyInstance.getMode(selectedModeIndex) || [];

  return (
    <>
      <svg width={320} height={320} style={{ border: "1px solid #ccc" }}>
        {/* Circle background */}
        <circle cx={centerX} cy={centerY} r={radius} fill="#f0f0f0" />

        {/* Keys positioned around the circle */}
        {keys.map((key, index) => {
          const angle = (index / keys.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const isSelected = key === selectedKey;

          return (
            <g
              key={key}
              onClick={() => setSelectedKey(key)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 20 : 15}
                fill={isSelected ? "#4caf50" : "#2196f3"}
                stroke="#333"
                strokeWidth={isSelected ? 3 : 1}
              />
              <text
                x={x}
                y={y + 5}
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

      {/* Mode selection dropdown menu*/}
      <div style={{ marginTop: 20 }}>
        <label htmlFor="mode-select">Select Mode: </label>
        <select
          id="mode-select"
          value={selectedModeIndex}
          onChange={(e) => setSelectedModeIndex(Number(e.target.value))}
        >
          {MODES.map((mode, i) => (
            <option key={mode} value={i}>
              {mode}
            </option>
          ))}
        </select>
      </div>

      {/* Display notes of the selected mode */}
      <div style={{ marginTop: 10 }}>
        <strong>Mode Notes:</strong> {modeNotes.join(", ")}
      </div>
    </>
  );
}

export default CircleOfFifths;
