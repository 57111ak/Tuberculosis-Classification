import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Database from './components/Database';
import {Xray }from './pages/Xray';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/database" element={<Database />} />
        <Route path="/xray" element={<Xray />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
