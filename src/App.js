import { useState } from "react";
import "./style.css";
import Autentificare from "./pages/autentificare";
import Inregistrare from "./pages/inregistrare.js";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";

import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isRegistrationPageActive, setIsRegistrationPageActive] = useState(false);

  return (
    <>
      <CssVarsProvider defaultMode="dark">
        <Router>
          <Header showForm={showForm} setShowForm={setShowForm} />

          <Routes>
            <Route path="/" element={<Home showForm={showForm} setShowForm={setShowForm} />} />
            <Route
              path="/inregistrare"
              element={<Inregistrare setIsRegistrationPageActive={setIsRegistrationPageActive} />}
            />
            <Route
              path="/autentificare"
              element={<Autentificare setIsRegistrationPageActive={setIsRegistrationPageActive} />}
            />
            <Route path="/profil" element={<ProfilePage />} />
          </Routes>
        </Router>
      </CssVarsProvider>
    </>
  );
}

export default App;
