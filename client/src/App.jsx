import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [operator, setOperator] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const RequireOperator = ({ children }) => {
    return operator ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Navbar userName={operator?.name} setOperator={setOperator} />

      <Routes>
        <Route path="/login" element={<Login setOperator={setOperator} />} />
        <Route path="/register" element={<Register setOperator={setOperator} />} />
        
        <Route
          path="/"
          element = {
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