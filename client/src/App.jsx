import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  // 1. CHK: Initialize state by safely reading and parsing the "user" object
  const [operator, setOperator] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Wrapper component that protects private routes
  const RequireOperator = ({ children }) => {
    return operator ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Pass down setOperator to Login/Register */}
        <Route path="/login" element={<Login setOperator={setOperator} />} />
        <Route path="/register" element={<Register setOperator={setOperator} />} />
        
        <Route
          path="/"
          element={
            <RequireOperator>
              <Dashboard setOperator={setOperator} />
            </RequireOperator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;