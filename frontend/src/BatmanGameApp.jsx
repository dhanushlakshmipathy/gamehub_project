import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api'

// Simple Batman-themed navigation
const SimpleNavbar = () => (
  <nav className="bg-black border-b border-batman-gray p-4">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      <Link to="/" className="text-2xl font-bold text-batman-gold">
        🦇 GameHub
      </Link>
      <div className="flex space-x-6">
        <Link to="/" className="text-white hover:text-batman-gold transition-colors">
          Home
        </Link>
        <Link to="/games" className="text-white hover:text-batman-gold transition-colors">
          Games
        </Link>
        <Link to="/lists" className="text-white hover:text-batman-gold transition-colors">
          Lists
        </Link>
        <Link to="/login" className="text-white hover:text-batman-gold transition-colors">
          Login
        </Link>
      </div>
    </div>
  </nav>
)

// Batman-themed page wrapper
const BatmanPage = ({ title, children }) => (
  <div className="min-h-screen bg-black text-white">
    <SimpleNavbar />
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-batman-gold mb-8">{title}</h1>
      {children}
    </div>
  </div>
)

// Home page with real games from API
const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/games?limit=6`);
      setGames(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <BatmanPage title="🎮 Discover Games">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-batman-gold"></div>
          <p className="text-gray-300 mt-4">Loading games from the shadows...</p>
        </div>
      </BatmanPage>
    );
  }

  if (error) {
    return (
      <BatmanPage title="🎮 Discover Games">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={fetchGames}
            className="bg-batman-gold text-black px-4 py-2 rounded-lg hover:bg-batman-yellow transition-colors"
          >
            Try Again
          </button>
        </div>
      </BatmanPage>
    );
  }

  return (
    <BatmanPage title="🎮 Discover Games">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-8">Welcome to the darkest gaming platform in Gotham</p>
        </div>
        
        {/* Featured Games from RAWG API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <div key={game._id} className="bg-batman-dark border border-batman-gray rounded-lg overflow-hidden hover:border-batman-gold transition-all group">
              <div className="aspect-video bg-batman-gray flex items-center justify-center overflow-hidden">
                {game.cover ? (
                  <img 
                    src={game.cover} 
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <span className="text-batman-gold text-4xl">🎮</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white group-hover:text-batman-gold transition-colors line-clamp-2">
                  {game.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    {game.released && (
                      <span className="text-gray-400 text-sm">{new Date(game.released).getFullYear()}</span>
                    )}
                    {game.genres && game.genres.length > 0 && (
                      <span className="text-batman-gold text-xs">{game.genres[0]}</span>
                    )}
                  </div>
                  <button className="bg-batman-gold text-black px-3 py-1 rounded text-sm hover:bg-batman-yellow transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BatmanPage>
  );
}

// Games page with real API data
const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllGames();
  }, []);

  const fetchAllGames = async (search = '') => {
    try {
      setLoading(true);
      const params = { limit: 20 };
      if (search) params.search = search;
      
      const response = await axios.get(`${API_BASE_URL}/games`, { params });
      setGames(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAllGames(searchQuery);
  };

  if (loading) {
    return (
      <BatmanPage title="🎯 All Games">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-batman-gold"></div>
          <p className="text-gray-300 mt-4">Loading games from the database...</p>
        </div>
      </BatmanPage>
    );
  }

  return (
    <BatmanPage title="🎯 All Games">
      <div className="space-y-6">
        <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-8">
          <input 
            type="text" 
            placeholder="Search games..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-batman-dark border border-batman-gray rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-batman-gold focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-batman-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-batman-yellow transition-colors"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => fetchAllGames()}
              className="bg-batman-gold text-black px-4 py-2 rounded-lg hover:bg-batman-yellow transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {games.map(game => (
            <div key={game._id} className="bg-batman-dark border border-batman-gray rounded-lg overflow-hidden hover:border-batman-gold transition-all group">
              <div className="aspect-square bg-batman-gray flex items-center justify-center overflow-hidden">
                {game.cover ? (
                  <img 
                    src={game.cover} 
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <span className="text-batman-gold text-3xl">🎮</span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-white group-hover:text-batman-gold transition-colors text-sm line-clamp-2">
                  {game.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    {game.released && (
                      <span className="text-gray-400 text-xs">{new Date(game.released).getFullYear()}</span>
                    )}
                    {game.platforms && game.platforms.length > 0 && (
                      <span className="text-batman-gold text-xs">{game.platforms.length} platforms</span>
                    )}
                  </div>
                  <button className="bg-batman-gold text-black px-2 py-1 rounded text-xs hover:bg-batman-yellow transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {games.length === 0 && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-400">No games found. Try a different search term.</p>
          </div>
        )}
      </div>
    </BatmanPage>
  );
}

// Lists page
const ListsPage = () => (
  <BatmanPage title="📋 My Lists">
    <div className="space-y-6">
      <button className="bg-batman-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-batman-yellow transition-colors">
        + Create New List
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Want to Play", count: 15, color: "batman-gold" },
          { name: "Currently Playing", count: 3, color: "batman-gold" },
          { name: "Completed", count: 28, color: "batman-gold" },
          { name: "Batman Games", count: 12, color: "batman-gold" },
          { name: "Co-op Games", count: 8, color: "batman-gold" },
          { name: "Horror Games", count: 6, color: "batman-gold" }
        ].map((list, i) => (
          <div key={i} className="bg-batman-dark border border-batman-gray rounded-lg p-6 hover:border-batman-gold transition-all group">
            <h3 className="text-xl font-semibold text-white group-hover:text-batman-gold transition-colors mb-2">
              {list.name}
            </h3>
            <p className="text-gray-400 mb-4">{list.count} games</p>
            <button className="bg-batman-gold text-black px-4 py-2 rounded font-medium hover:bg-batman-yellow transition-colors">
              View List
            </button>
          </div>
        ))}
      </div>
    </div>
  </BatmanPage>
)

// Login page
const LoginPage = () => (
  <BatmanPage title="🔐 Login">
    <div className="max-w-md mx-auto">
      <div className="bg-batman-dark border border-batman-gray rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-black border border-batman-gray rounded-lg px-4 py-3 text-white focus:border-batman-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-black border border-batman-gray rounded-lg px-4 py-3 text-white focus:border-batman-gold focus:outline-none"
            />
          </div>
          <button className="w-full bg-batman-gold text-black py-3 rounded-lg font-semibold hover:bg-batman-yellow transition-colors">
            Sign In
          </button>
          <p className="text-center text-gray-400">
            Don't have an account? <Link to="/register" className="text-batman-gold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  </BatmanPage>
)

function BatmanGameApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/lists" element={<ListsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default BatmanGameApp