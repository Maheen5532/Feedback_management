import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ThankYou from "./components/ThankYou";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  // Wrapper to use navigate outside of NavBar
  const MainRoutes = () => {
    const navigate = useNavigate();
    // Updated NavBar to use navigate
    const NavBar = () => (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Student Feedback System
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/")}
                className={`px-4 py-2 rounded ${
                  window.location.pathname === "/" ||
                  window.location.pathname === "/thankyou"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Submit Feedback
              </button>
              {!isLoggedIn ? (
                <button
                  onClick={() => navigate("/admin/login")}
                  className={`px-4 py-2 rounded ${
                    window.location.pathname === "/admin/login"
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Admin Login
                </button>
              ) : (
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className={`px-4 py-2 rounded ${
                    window.location.pathname === "/admin/dashboard"
                      ? "bg-blue-100 text-blue-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );

    return (
      <>
        <NavBar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={<FeedbackForm onSuccess={() => navigate("/thankyou")} />}
            />
            <Route
              path="/thankyou"
              element={<ThankYou onBack={() => navigate("/")} />}
            />
            <Route
              path="/admin/login"
              element={
                <AdminLogin
                  onLogin={() => {
                    setIsLoggedIn(true);
                    navigate("/admin/dashboard");
                  }}
                />
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                isLoggedIn ? (
                  <AdminDashboard
                    onLogout={() => {
                      setIsLoggedIn(false);
                      localStorage.removeItem("adminToken");
                      navigate("/");
                    }}
                  />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="*"
              element={<FeedbackForm onSuccess={() => navigate("/thankyou")} />}
            />
          </Routes>
        </main>
      </>
    );
  };

  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}
export default App;