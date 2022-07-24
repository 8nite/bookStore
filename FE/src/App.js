import './App.css';
import React, { createContext, useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { reducer, initialState } from "./reducer/useReducer";
import Main from "./components/Main";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/payment/success" element={<PaymentSuccess/>} />
            <Route path="/payment/cancel" element={<PaymentFailed/>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
