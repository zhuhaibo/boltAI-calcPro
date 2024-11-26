import React from 'react';
import { Calculator, Home, LogOut, List } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, username } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold hover:text-indigo-100 transition-colors">
              HB.Z
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/calculator"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/calculator'
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <Calculator size={18} />
              <span>Calculator</span>
            </Link>
            <Link
              to="/list"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/list'
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <List size={18} />
              <span>History</span>
            </Link>
            <div className="pl-4 border-l border-indigo-500 flex items-center space-x-4">
              <span className="text-sm">{username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-500"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}