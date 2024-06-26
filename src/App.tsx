import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Risk from "./views/Risk/Risk";
import Diversification from "./views/Diversification/Diversification";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Risk />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/risk" element={<Risk />} />
            <Route path="/diversification" element={<Diversification />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
