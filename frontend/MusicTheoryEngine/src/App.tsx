import React from "react";
import CircleOfFifths from "./components/CircleOfFifths";

function App() {
  return (
    <div
      id="app-wrapper"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        padding: 0,
        backgroundColor: "#4a50a0", // full-page blue
      }}
    >
      <h1 style={{ margin: 0, padding: "24px 0", textAlign: "center" }} >Circle of Fifths</h1>
      <CircleOfFifths />
    </div>
  );
}

export default App;
