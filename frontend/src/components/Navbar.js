import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300 hover:underline"
        >
          Client Management System
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/clients"
                className="text-white hover:text-gray-300 transition-colors duration-300 hover:underline"
              >
                Clients
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-gray-300 transition-colors duration-300 hover:underline"
              >
                Services
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-300 transition-colors duration-300 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition-colors duration-300 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-gray-300 transition-colors duration-300 hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <button
          className="text-white md:hidden block"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } fixed inset-0 flex items-center justify-center bg-blue-600 bg-opacity-95 z-50 md:hidden`}
        >
          <button
            className="text-white absolute top-4 right-4"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center">
            {user ? (
              <>
                <Link
                  to="/clients"
                  className="block mt-4 text-white text-lg mb-4 hover:text-gray-300 transition-colors duration-300 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Clients
                </Link>
                <Link
                  to="/services"
                  className="block text-white text-lg mb-4 hover:text-gray-300 transition-colors duration-300 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block text-white text-lg mb-4 hover:text-gray-300 transition-colors duration-300 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block mt-4 text-white text-lg mb-4 hover:text-gray-300 transition-colors duration-300 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-white text-lg mb-4 hover:text-gray-300 transition-colors duration-300 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
