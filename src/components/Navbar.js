import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ setTheme, currentTheme }) => {
  return (
    <nav
      style={{
        padding: '1rem',
        background: 'linear-gradient(135deg, #00feba, #5b548a)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>RBAC Dashboard</h1>
      <div>
        <Link to="/" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>
          Users
        </Link>
        <Link to="/roles" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>
          Roles
        </Link>
        <Link to="/permissions" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>
          Permissions
        </Link>
        <Link to="/logs" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>
          Logs
        </Link>
      </div>
      {}
      <ThemeToggle setTheme={setTheme} currentTheme={currentTheme} />
    </nav>
  );
};

export default Navbar;
