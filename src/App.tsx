import React, { useState } from "react";
import { Counter } from "./components/counter/Counter";
import "./App.css";
import { Banking } from "./components/banking/Banking";
import styles from "./components/banking/Banking.module.css";
import { useAppDispatch } from "./app/hooks";
import { resetState } from "./components/banking/bankingSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Welcome } from "./components/welcome/Welcome";
import { Dashboard } from "./components/dashboard/Dashboard";

function handleExit(setDisplayBlockchain: any, dispatch: any) {
  setDisplayBlockchain(false);
  dispatch(resetState());
}

function App() {
  const [displayCount, setDisplayCount] = useState(false);
  const [displayBanking, setDisplayBanking] = useState(false);
  const dispatch = useAppDispatch();

  let counter;
  let banking;

  if (displayCount) {
    counter = <Counter />;
  }

  //todo add a token so accessing banking or dashboard without logging in redirects you

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
