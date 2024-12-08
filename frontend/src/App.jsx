import { Route, BrowserRouter, Routes } from "react-router-dom";

import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";

import { Layout } from "./layouts/Layout.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Client Protected Routes */}
        <Route
          path="/client/"
          element={<ProtectedRoute allowedRoles={["client"]}>{/* Layouts here */}</ProtectedRoute>}
        />

        {/* Freelance Protected Routes */}
        <Route
          path="/freelance"
          element={
            <ProtectedRoute allowedRoles={["freelance"]}>{/* Layouts here */}</ProtectedRoute>
          }
        />

        {/* With Layout */}
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
