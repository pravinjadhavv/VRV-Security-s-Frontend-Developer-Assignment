

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import Logs from './pages/Logs';
import { lightTheme, darkTheme, shadowTheme } from "./theme";

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const themeStyles = () => {
    if (currentTheme === "light") return lightTheme;
    if (currentTheme === "dark") return darkTheme;
    return shadowTheme;
  };

  useEffect(() => {
    document.body.className = ''; 
    document.body.classList.add(currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <Router>
      <Navbar setTheme={setCurrentTheme} currentTheme={currentTheme} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
