import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();

  const navStyle: React.CSSProperties = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    marginBottom: '2rem'
  };

  const navListStyle: React.CSSProperties = {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
    alignItems: 'center'
  };

  const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: '#34495e'
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <div style={containerStyle}>
          <ul style={navListStyle}>
            <li>
              <h1 style={titleStyle}>🚀 React Router Workshop</h1>
            </li>
            <li style={{ marginLeft: 'auto' }}>
              <Link 
                to="/" 
                style={location.pathname === '/' ? activeLinkStyle : linkStyle}
              >
                🏠 หน้าแรก
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                style={location.pathname === '/users' ? activeLinkStyle : linkStyle}
              >
                👥 ผู้ใช้
              </Link>
            </li>
            <li>
              <Link
                to="/users/new"
                style={location.pathname === '/users/new' ? activeLinkStyle : linkStyle}
              >
                📝 เพิ่มผู้ใช้
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main style={containerStyle}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        backgroundColor: '#ecf0f1', 
        textAlign: 'center',
        color: '#7f8c8d'
      }}>
        <p>📚 React Router Workshop - Day 1: พื้นฐานการนำทาง</p>
        <p>สร้างด้วย Vite + React + TypeScript + React Router DOM</p>
      </footer>
    </div>
  );
};

export default Layout;
