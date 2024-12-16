import './App.css'
import Header from './component/Header'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Login } from './component/login/Login.jsx';
import { Home } from './component/home/Home.jsx'
import Blog from './component/blog/Blog.jsx';

function DashboardPage() {
  return <h2>Dashboard</h2>;
}

const isAuthenticated = false;
function App() {
  return (
    <Router>
      {location.pathname !== '/login'  && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App
