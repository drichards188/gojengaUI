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
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";

function App() {
  const [displayCount, setDisplayCount] = useState(false);

  let counter;

  if (displayCount) {
    counter = <Counter />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
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
