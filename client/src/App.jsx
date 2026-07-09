import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";

const RequireOperator = ({ children }) => {
  const operator = localStorage.getItem("operatorName");
  return operator ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireOperator>
              <Dashboard />
            </RequireOperator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
