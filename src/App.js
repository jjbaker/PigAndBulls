import React from "react";
import Header from "./components/Header.js"
import Split from "react-split"
import Guess from "./components/Guess.js"
import "./style.css";

export default function App() {
  return (
    <div>
      <Header />
      <Split>
        <Guess />
        <Guess />
      </Split>
    </div>
  );
}
