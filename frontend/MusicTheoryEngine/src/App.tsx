import React from "react";
import CircleOfFifths from "./components/CircleOfFifths";


function App() {
  return (
    <div id="app-wrapper" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Circle of Fifths</h1>
      <CircleOfFifths />
    </div>
  );
}




export default App;


