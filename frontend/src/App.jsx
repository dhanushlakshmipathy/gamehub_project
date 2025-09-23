import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Lists from './pages/Lists'
import Navbar from './components/Navbar'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main App Component
function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/games/:id' element={<GameDetail/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/profile/:id' element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            } />
            <Route path='/lists' element={
              <ProtectedRoute>
                <Lists/>
              </ProtectedRoute>
            } />
            <Route path='*' element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
                <p className="text-gray-500">Page not found</p>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
