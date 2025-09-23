import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import GameCard from '../components/GameCard'
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  FireIcon,
  TrendingUpIcon 
} from '@heroicons/react/24/outline'

export default function Home() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  
  const [searchParams] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    // Check if there's a search query in URL params
    const urlSearch = searchParams.get('search')
    if (urlSearch) {
      setSearchQuery(urlSearch)
      fetchGames(urlSearch, filter, sortBy)
    } else {
      fetchGames('', filter, sortBy)
    }
  }, [searchParams, filter, sortBy])

  const fetchGames = async (search = '', filterType = 'all', sort = 'rating') => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      
      if (search) {
        params.append('search', search)
      }
      
      params.append('limit', '24')
      params.append('sort', sort)
      
      if (filterType !== 'all') {
        params.append('filter', filterType)
      }

      const url = `http://localhost:5000/api/games?${params.toString()}`
      const res = await axios.get(url)
      setGames(res.data)
    } catch (err) {
      console.error('Backend not available, using mock data:', err)
      // Mock data for demonstration when backend is not running
      setGames([
        {
          _id: '1',
          title: 'The Witcher 3: Wild Hunt',
          cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp',
          released: '2015-05-19',
          rating: 9.3,
          ratingCount: 1250,
          genres: ['RPG', 'Adventure'],
          platforms: ['PC', 'PlayStation', 'Xbox'],
          description: 'An open-world RPG masterpiece...'
        },
        {
          _id: '2',
          title: 'Cyberpunk 2077',
          cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.webp',
          released: '2020-12-10',
          rating: 7.2,
          ratingCount: 890,
          genres: ['RPG', 'Action'],
          platforms: ['PC', 'PlayStation', 'Xbox'],
          description: 'A futuristic open-world adventure...'
        },
        {
          _id: '3',
          title: 'Elden Ring',
          cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp',
          released: '2022-02-25',
          rating: 9.6,
          ratingCount: 2100,
          genres: ['Action', 'RPG'],
          platforms: ['PC', 'PlayStation', 'Xbox'],
          description: 'FromSoftware\'s latest masterpiece...'
        },
        {
          _id: '4',
          title: 'God of War',
          cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.webp',
          released: '2018-04-20',
          rating: 9.4,
          ratingCount: 1800,
          genres: ['Action', 'Adventure'],
          platforms: ['PlayStation', 'PC'],
          description: 'Kratos embarks on a new journey...'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchGames(searchQuery, filter, sortBy)
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
  }

  const clearSearch = () => {
    setSearchQuery('')
    fetchGames('', filter, sortBy)
  }

  const filterOptions = [
    { value: 'all', label: 'All Games', icon: SparklesIcon },
    { value: 'new', label: 'New Releases', icon: FireIcon },
    { value: 'popular', label: 'Popular', icon: TrendingUpIcon },
  ]

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'released', label: 'Release Date' },
    { value: 'title', label: 'A-Z' },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <SparklesIcon className="w-8 h-8 text-green-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Discover Games
          </h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore thousands of games, create lists, and share your gaming experiences
        </p>
      </div>

      {/* Search & Filters */}
      <div className="card p-6 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for games..."
            className="input pl-12 text-lg"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ×
            </button>
          )}
        </form>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    filter === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Info */}
        {!loading && games.length > 0 && (
          <div className="text-gray-400 text-sm">
            {searchQuery ? (
              <>Showing {games.length} results for "{searchQuery}"</>
            ) : (
              <>Showing {games.length} games</>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="spinner"></div>
            <p className="text-gray-400">Loading amazing games...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && games.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl text-gray-600 mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-gray-300">No games found</h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `Try adjusting your search term or filters`
              : 'No games available at the moment'
            }
          </p>
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="btn btn-ghost mt-4"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Games Grid */}
      {!loading && games.length > 0 && (
        <div className="game-grid animate-fade-in">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}

      {/* Load More Button (if needed) */}
      {!loading && games.length >= 24 && (
        <div className="text-center py-8">
          <button className="btn btn-ghost">
            Load More Games
          </button>
        </div>
      )}
    </div>
  )
}
