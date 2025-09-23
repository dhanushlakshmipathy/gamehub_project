import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function TestApp() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex space-x-6">
            <Link to="/" className="text-green-500 hover:text-green-400 font-medium">Home</Link>
            <Link to="/test" className="text-green-500 hover:text-green-400 font-medium">Test</Link>
          </div>
        </nav>
        
        <div className="p-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-5xl font-bold text-green-500 mb-6">🎮 GameHub</h1>
                <p className="text-xl text-gray-300 mb-8">Your gaming companion is working!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-green-400 font-semibold mb-2">✅ React</h3>
                    <p className="text-gray-400">Components rendering</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-green-400 font-semibold mb-2">✅ Tailwind</h3>
                    <p className="text-gray-400">Styles loading</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-green-400 font-semibold mb-2">✅ Router</h3>
                    <p className="text-gray-400">Navigation working</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/test" element={
              <div>
                <h1 className="text-4xl font-bold text-green-500 mb-4">Test Route</h1>
                <p className="text-gray-300">If you can see this, routing is working!</p>
                <Link to="/" className="text-green-500 hover:text-green-400 underline mt-4 inline-block">← Back to Home</Link>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}