import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to Client Management System</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
          {user ? (
            <div className="space-y-4">
              <p className="text-lg text-center text-gray-700">Hello, {user.name}!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/clients"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-300 ease-in-out"
                >
                  <span className="mr-2">Manage Clients</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Link
                  to="/services"
                  className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-300 ease-in-out"
                >
                  <span className="mr-2">Manage Services</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-center text-gray-700">Please log in or register to access the system.</p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-300 ease-in-out p-2"
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-300 ease-in-out p-2"
                >
                  <span>Register</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
