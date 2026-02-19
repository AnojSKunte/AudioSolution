import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';

function Layout() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="logo-section">
          <h1>🎵 Audio Solution</h1>
        </div>

        <div className="nav-items">
          <Link to="/" className="nav-item">
            <FaHome /> Dashboard
          </Link>
          <Link to="/settings" className="nav-item">
            <FaCog /> Settings
          </Link>
        </div>

        <div className="user-section">
          <div className="user-info">
            <p className="user-name">{user?.name || 'User'}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
