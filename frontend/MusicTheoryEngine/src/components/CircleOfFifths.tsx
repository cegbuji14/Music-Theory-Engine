import React, { useState } from "react";
import { Key } from "../utils/Key";

const keys = [
  "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"
];

const radius = 150;
const centerX = 160;
const centerY = 160;

function CircleOfFifths() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Get position of the selected key in the keys array
  const selectedPosition = selectedKey ? keys.indexOf(selectedKey) : -1;

  // Create Key instance if selected
  const keyInstance = selectedKey && selectedPosition >= 0
    ? new Key(selectedKey, selectedPosition)
    : null;

  return (
    <>
      <svg width={320} height={320} style={{ border: "1px solid #ccc" }}>
        <circle cx={centerX} cy={centerY} r={radius} fill="#f0f0f0" />
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

      {/* Show selected key details */}
      {keyInstance && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <h2>Details for {keyInstance.name}</h2>
          <p><strong>Accidentals:</strong> {keyInstance.getAccidentals()}</p>
          <p><strong>Relative Minor:</strong> {keyInstance.getRelativeMinor()}</p>
          <p><strong>Diatonic Scale:</strong> {keyInstance.getDiatonicScale()?.join(", ")}</p>
          <p><strong>Diatonic Chords:</strong> {keyInstance.getDiatonicChords()?.join(", ")}</p>
        </div>
      )}
    </>
  );
}

export default CircleOfFifths;
