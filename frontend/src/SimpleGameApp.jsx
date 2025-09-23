import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

// Simple mock components without AuthContext dependencies
const SimplePage = ({ title, children }) => (
  <div className="min-h-screen bg-gray-900 text-white">
    <div className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="flex space-x-6">
        <Link to="/" className="text-green-500 hover:text-green-400 font-medium">Home</Link>
        <Link to="/login" className="text-green-500 hover:text-green-400 font-medium">Login</Link>
        <Link to="/register" className="text-green-500 hover:text-green-400 font-medium">Register</Link>
      </div>
    </div>
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-500 mb-6">{title}</h1>
      {children}
    </div>
  </div>
)

const SimpleHome = () => (
  <SimplePage title="🎮 GameHub - Home">
    <div className="space-y-6">
      <p className="text-xl text-gray-300">Welcome to your gaming companion!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Discover Games</h3>
          <p className="text-gray-400">Find your next favorite game</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Track Progress</h3>
          <p className="text-gray-400">Keep track of your gaming journey</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Create Lists</h3>
          <p className="text-gray-400">Organize your game collection</p>
        </div>
      </div>
    </div>
  </SimplePage>
)

const SimpleLogin = () => (
  <SimplePage title="Login">
    <div className="max-w-md">
      <p className="text-gray-300 mb-4">Sign in to your GameHub account</p>
      <div className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg">
          Sign In
        </button>
      </div>
    </div>
  </SimplePage>
)

const SimpleRegister = () => (
  <SimplePage title="Register">
    <div className="max-w-md">
      <p className="text-gray-300 mb-4">Create your GameHub account</p>
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg">
          Create Account
        </button>
      </div>
    </div>
  </SimplePage>
)

function SimpleApp() {
  return (
    <Routes>
      <Route path="/" element={<SimpleHome />} />
      <Route path="/login" element={<SimpleLogin />} />
      <Route path="/register" element={<SimpleRegister />} />
      <Route path="*" element={
        <SimplePage title="404 - Not Found">
          <p className="text-gray-300">Page not found</p>
          <Link to="/" className="text-green-500 hover:text-green-400 underline">Go back home</Link>
        </SimplePage>
      } />
    </Routes>
  )
}

export default SimpleApp