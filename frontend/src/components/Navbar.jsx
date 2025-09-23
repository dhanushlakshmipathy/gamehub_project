import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  MagnifyingGlassIcon, 
  UserCircleIcon, 
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ListBulletIcon,
  CompassIcon
} from '@heroicons/react/24/outline'

export default function Navbar(){
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
          >
            <div className="p-2 bg-gradient-primary rounded-lg">
              <CompassIcon className="w-6 h-6 text-white" />
            </div>
            <span>GameHub</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`nav-link flex items-center gap-2 ${isActive('/') ? 'active text-green-500' : ''}`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/lists" 
                className={`nav-link flex items-center gap-2 ${isActive('/lists') ? 'active text-green-500' : ''}`}
              >
                <ListBulletIcon className="w-4 h-4" />
                <span>Lists</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile/me" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span className="hidden lg:inline">{user?.username}</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 animate-slide-up">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${isActive('/') ? 'text-green-500' : 'text-gray-300'}`}
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </Link>

              {isAuthenticated && (
                <Link 
                  to="/lists" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${isActive('/lists') ? 'text-green-500' : 'text-gray-300'}`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                  <span>Lists</span>
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile/me" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300"
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>Profile ({user?.username})</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-900 transition-colors duration-200 text-red-400"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center btn btn-ghost"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center btn btn-primary"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
