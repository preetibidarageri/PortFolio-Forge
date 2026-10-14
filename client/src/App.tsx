import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebsiteLayout from "./components/WebsiteLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileType from "./pages/ProfileType";
import Dashboard from "./pages/Dashboard";
import PortfolioPreview from "./pages/PortfolioPreview";
import PublicPortfolio from "./pages/PublicPortfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================= */}
        {/* WEBSITE PAGES WITH NAVIGATION */}
        {/* ============================= */}

        <Route element={<WebsiteLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/profile" element={<ProfileType />} />

            <Route path="/portfolio-preview" element={<PortfolioPreview />} />
          </Route>
        </Route>

        {/* ============================= */}
        {/* STANDALONE PUBLIC PORTFOLIO */}
        {/* ============================= */}

        <Route path="/portfolio/:slug" element={<PublicPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
