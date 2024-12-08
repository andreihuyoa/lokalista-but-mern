import { Route, BrowserRouter, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";

import { Layout } from "./layouts/Layout.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

import ClientDashboard from "./pages/client/Dashboard.jsx";
import Projects from "./pages/client/Projects.jsx";
import HireFreelancer from "./pages/client/HireFreelancer.jsx";

import FreelanceDashboard from "./pages/freelancer/Dashboard.jsx";
import Teams from "./pages/freelancer/Teams.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Client Protected Routes */}
        <Route
          path="/client/*"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="hire" element={<HireFreelancer />} />
                  <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Freelance Protected Routes */}
        <Route
          path="/freelancer/*"
          element={
            <ProtectedRoute allowedRoles={["freelance"]}>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<FreelanceDashboard />} />
                  <Route path="teams" element={<Teams />} />
                  <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Auth Routes with Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
