import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import GameCard from '../components/GameCard'
import {
  UserIcon,
  CalendarIcon,
  StarIcon,
  ListBulletIcon,
  HeartIcon,
  EyeIcon,
  PencilIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import axios from 'axios'

export default function Profile() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const isOwnProfile = id === 'me' || id === currentUser?.id
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    listsCreated: 0,
    reviews: 0,
    averageRating: 0,
    totalHours: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [favoriteGames, setFavoriteGames] = useState([])
  const [userLists, setUserLists] = useState([])

  useEffect(() => {
    fetchUserProfile()
    fetchUserStats()
    fetchUserActivity()
  }, [id])

  const fetchUserProfile = async () => {
    try {
      const userId = isOwnProfile ? currentUser?.id : id
      let response
      
      if (isOwnProfile) {
        // Use the current user data
        setUser(currentUser)
      } else {
        // Fetch public profile
        response = await axios.get(`http://localhost:5000/api/users/${userId}`)
        setUser(response.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      // Mock user data for demonstration
      setUser({
        id: '1',
        username: isOwnProfile ? currentUser?.username || 'You' : 'GamePlayer123',
        email: isOwnProfile ? currentUser?.email : 'player@example.com',
        bio: 'Gaming enthusiast who loves RPGs and indie games. Always looking for the next great adventure!',
        joinedAt: '2024-01-15',
        location: 'New York, USA',
        favoriteGenres: ['RPG', 'Indie', 'Action'],
        avatar: null
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUserStats = async () => {
    try {
      // These endpoints don't exist yet, so using mock data
      setStats({
        gamesPlayed: 47,
        listsCreated: 5,
        reviews: 23,
        averageRating: 4.2,
        totalHours: 342
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchUserActivity = async () => {
    try {
      // Mock recent activity
      setRecentActivity([
        { type: 'review', game: 'The Witcher 3', rating: 5, date: new Date() },
        { type: 'list', name: 'Best RPGs of 2024', date: new Date(Date.now() - 86400000) },
        { type: 'wishlist', game: 'Cyberpunk 2077', date: new Date(Date.now() - 172800000) }
      ])
      
      setFavoriteGames([
        // Mock favorite games - in real app these would come from backend
      ])
      
      setUserLists([
        { _id: '1', title: 'My Favorites', gameCount: 12, isPublic: true },
        { _id: '2', title: 'Want to Play', gameCount: 8, isPublic: false }
      ])
    } catch (error) {
      console.error('Error fetching activity:', error)
    }
  }

  const formatJoinDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM yyyy')
    } catch {
      return 'Recently'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'lists', label: 'Lists', icon: ListBulletIcon },
    { id: 'reviews', label: 'Reviews', icon: StarIcon },
    { id: 'activity', label: 'Activity', icon: EyeIcon }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="spinner"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-300 mb-4">User not found</h1>
        <p className="text-gray-500">The profile you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.username?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    Joined {formatJoinDate(user.joinedAt)}
                  </span>
                  {user.location && (
                    <span>{user.location}</span>
                  )}
                </div>
              </div>
              {isOwnProfile && (
                <button className="btn btn-ghost flex items-center gap-2">
                  <PencilIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
              )}
            </div>

            {/* Bio */}
            <p className="text-gray-300 mb-4">
              {user.bio || (isOwnProfile ? 'Add a bio to tell others about yourself!' : 'No bio yet.')}
            </p>

            {/* Favorite Genres */}
            {user.favoriteGenres && user.favoriteGenres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {user.favoriteGenres.map((genre, index) => (
                  <span key={index} className="badge badge-primary">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.gamesPlayed}</div>
                <div className="text-gray-400 text-xs">Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.listsCreated}</div>
                <div className="text-gray-400 text-xs">Lists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.reviews}</div>
                <div className="text-gray-400 text-xs">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.averageRating.toFixed(1)}</div>
                <div className="text-gray-400 text-xs">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.totalHours}h</div>
                <div className="text-gray-400 text-xs">Played</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        {activity.type === 'review' && (
                          <p className="text-gray-300">
                            Reviewed <span className="text-white font-semibold">{activity.game}</span>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon 
                                  key={i} 
                                  className={`w-3 h-3 ${i < activity.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                                />
                              ))}
                            </div>
                          </p>
                        )}
                        {activity.type === 'list' && (
                          <p className="text-gray-300">
                            Created list <span className="text-white font-semibold">{activity.name}</span>
                          </p>
                        )}
                        {activity.type === 'wishlist' && (
                          <p className="text-gray-300">
                            Added <span className="text-white font-semibold">{activity.game}</span> to wishlist
                          </p>
                        )}
                      </div>
                      <span className="text-gray-500 text-xs">
                        {format(activity.date, 'MMM dd')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>

            {/* Top Lists */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4">Lists</h2>
              {userLists.length > 0 ? (
                <div className="space-y-3">
                  {userLists.slice(0, 3).map((list) => (
                    <div key={list._id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">{list.title}</h3>
                        <p className="text-gray-400 text-sm">{list.gameCount} games</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {list.isPublic ? (
                          <EyeIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No lists created yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'lists' && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">All Lists</h2>
            {userLists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userLists.map((list) => (
                  <div key={list._id} className="card p-4">
                    <h3 className="font-semibold text-white mb-2">{list.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{list.gameCount} games</span>
                      <span className={`badge ${list.isPublic ? 'badge-primary' : 'badge-gray'}`}>
                        {list.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ListBulletIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No lists created yet</p>
                {isOwnProfile && (
                  <p className="text-gray-500 text-sm mt-1">Create your first list to organize your games</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Game Reviews</h2>
            <div className="text-center py-12">
              <StarIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No reviews yet</p>
              {isOwnProfile && (
                <p className="text-gray-500 text-sm mt-1">Start reviewing games to share your opinions</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Activity Timeline</h2>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-700 last:border-b-0">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 mb-1">
                        {activity.type === 'review' && `Reviewed ${activity.game}`}
                        {activity.type === 'list' && `Created list "${activity.name}"`}
                        {activity.type === 'wishlist' && `Added ${activity.game} to wishlist`}
                      </p>
                      <span className="text-gray-500 text-sm">
                        {format(activity.date, 'MMM dd, yyyy • h:mm a')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <EyeIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No activity yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
