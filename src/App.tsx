import React from "react";
import "./App.css";
import { Banking } from "./components/views/Banking";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Welcome } from "./components/welcome/Welcome";
import { Dashboard } from "./components/views/Dashboard";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Risk from "./components/risk/Risk";

function App() {
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
            <Route path="/risk" element={<Risk />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
