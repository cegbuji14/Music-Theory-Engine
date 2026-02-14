import React, { useState } from "react";
import { Key, MODES } from "../utils/key";

const keys = [
  "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"
];

const radius = 140;
const centerX = 160;
const centerY = 160;

function CircleOfFifths() {
  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(0);

  const keyInstance = new Key(selectedKey, 0);
  const modeNotes = keyInstance.getMode(selectedModeIndex) || [];

  const BASE_QUALITIES = [
    "maj",
    "min",
    "min",
    "maj",
    "maj",
    "min",
    "dim"
  ];
  
  const rotatedQualities = BASE_QUALITIES
    .slice(selectedModeIndex)
    .concat(BASE_QUALITIES.slice(0, selectedModeIndex));
  
    const chords = modeNotes.map((note, i) => {
      const quality = rotatedQualities[i];
      return quality === "maj"
        ? `${note}`
        : quality === "min"
        ? `${note}m`
        : `${note}dim`;
    });
    

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Circle of Fifths</h2>
    
        <div style={styles.layout}>
          {/* LEFT COLUMN - Circle */}
          <div>
            <svg width={320} height={320}>
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="#1f1f2e"
                stroke="#444"
                strokeWidth={2}
              />
    
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
                      r={isSelected ? 22 : 16}
                      fill={isSelected ? "#6c63ff" : "#2d7dd2"}
                      stroke={isSelected ? "#ffffff" : "#111"}
                      strokeWidth={isSelected ? 3 : 1}
                    />
                    <text
                      x={x}
                      y={y + 5}
                      fontSize="14"
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {key}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
    
          {/* RIGHT COLUMN - Info Panel */}
          <div style={styles.infoPanel}>
            <div style={styles.controls}>
              <label style={{ marginRight: 10 }}>Mode:</label>
              <select
                value={selectedModeIndex}
                onChange={(e) => setSelectedModeIndex(Number(e.target.value))}
                style={styles.select}
              >
                {MODES.map((mode, i) => (
                  <option key={mode} value={i}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
    
            <div style={styles.section}>
              <h3>Scale Notes</h3>
              <div style={styles.notesContainer}>
                {modeNotes.map((note, index) => (
                  <div key={index} style={styles.note}>
                    {note}
                  </div>
                ))}
              </div>
            </div>
    
            <div style={styles.section}>
              <h3>Diatonic Chords</h3>
              <div style={styles.notesContainer}>
                {chords.map((chord, i) => (
                  <div key={i} style={styles.note}>
                    {chord}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
    color: "#ffffff",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    marginBottom: "20",
    letterSpacing: 1,
  },
  controls: {
    marginTop: 25,
    display: "flex",
    alignItems: "center",
  },
  select: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #555",
    background: "#2c2c45",
    color: "#fff",
  },
  notesContainer: {
    marginTop: 25,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  note: {
    padding: "10px 16px",
    borderRadius: 20,
    background: "#3b3b70",
    fontWeight: 600,
    letterSpacing: 1,
    transition: "0.2s ease",
  },

  layout: {
    display: "flex",
    gap: 60,
    alignItems: "flex-start",
    marginTop: 30,
  },
  
  infoPanel: {
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  
};

export default CircleOfFifths;
