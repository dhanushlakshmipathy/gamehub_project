import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import GameCard from '../components/GameCard'
import {
  PlusIcon,
  ListBulletIcon,
  EyeIcon,
  HeartIcon,
  LockClosedIcon,
  GlobeAltIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import axios from 'axios'

export default function Lists() {
  const { user } = useAuth()
  const [lists, setLists] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedList, setSelectedList] = useState(null)
  const [newList, setNewList] = useState({
    title: '',
    description: '',
    isPublic: true
  })

  useEffect(() => {
    fetchUserLists()
  }, [])

  const fetchUserLists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/lists/user')
      setLists(response.data)
    } catch (error) {
      console.log('Lists endpoint not implemented yet')
      // Mock data for demonstration
      setLists([
        {
          _id: '1',
          title: 'My Favorites',
          description: 'Games that changed my life',
          isPublic: true,
          games: [],
          createdAt: new Date(),
          gameCount: 12
        },
        {
          _id: '2', 
          title: 'Want to Play',
          description: 'Games on my wishlist',
          isPublic: false,
          games: [],
          createdAt: new Date(),
          gameCount: 8
        }
      ])
    }
  }

  const handleCreateList = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/lists', newList)
      setLists([...lists, response.data])
      setNewList({ title: '', description: '', isPublic: true })
      setShowCreateForm(false)
    } catch (error) {
      console.error('Error creating list:', error)
    }
  }

  const handleDeleteList = async (listId) => {
    if (!window.confirm('Are you sure you want to delete this list?')) return
    
    try {
      await axios.delete(`http://localhost:5000/api/lists/${listId}`)
      setLists(lists.filter(list => list._id !== listId))
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient flex items-center gap-3">
            <ListBulletIcon className="w-8 h-8 text-green-500" />
            My Lists
          </h1>
          <p className="text-gray-400 mt-2">Organize your games into custom lists</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          New List
        </button>
      </div>

      {/* Create List Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Create New List</h2>
            <form onSubmit={handleCreateList} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  List Name
                </label>
                <input
                  type="text"
                  value={newList.title}
                  onChange={(e) => setNewList({...newList, title: e.target.value})}
                  placeholder="e.g., My Favorites"
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newList.description}
                  onChange={(e) => setNewList({...newList, description: e.target.value})}
                  placeholder="Describe your list..."
                  className="textarea h-20"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newList.isPublic}
                  onChange={(e) => setNewList({...newList, isPublic: e.target.checked})}
                  className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-300 flex items-center gap-2">
                  {newList.isPublic ? (
                    <GlobeAltIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <LockClosedIcon className="w-4 h-4 text-gray-500" />
                  )}
                  Make this list public
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn btn-primary flex-1">
                  Create List
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setNewList({ title: '', description: '', isPublic: true })
                  }}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lists Grid */}
      {lists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <div key={list._id} className="card card-hover p-6 relative group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{list.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{list.description}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-1 text-gray-400 hover:text-white transition-colors duration-200">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteList(list._id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* List Stats */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <ListBulletIcon className="w-4 h-4" />
                    {list.gameCount || list.games?.length || 0} games
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      {Math.floor(Math.random() * 100)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      {Math.floor(Math.random() * 20)}
                    </span>
                  </div>
                </div>

                {/* Privacy Badge */}
                <div className="flex items-center justify-between">
                  <span className={`badge flex items-center gap-1 ${
                    list.isPublic ? 'badge-primary' : 'badge-gray'
                  }`}>
                    {list.isPublic ? (
                      <GlobeAltIcon className="w-3 h-3" />
                    ) : (
                      <LockClosedIcon className="w-3 h-3" />
                    )}
                    {list.isPublic ? 'Public' : 'Private'}
                  </span>
                  <span className="text-gray-500 text-xs">
                    Created {new Date(list.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => setSelectedList(list)}
                  className="w-full btn btn-ghost text-sm"
                >
                  View & Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <ListBulletIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No lists yet</h3>
          <p className="text-gray-500 mb-6">Create your first list to organize your games</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            Create Your First List
          </button>
        </div>
      )}

      {/* List Detail View */}
      {selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedList.title}</h2>
                <p className="text-gray-400 mt-1">{selectedList.description}</p>
              </div>
              <button
                onClick={() => setSelectedList(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {selectedList.games?.length > 0 ? (
              <div className="game-grid">
                {selectedList.games.map((game) => (
                  <GameCard key={game._id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ListBulletIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">This list is empty</p>
                <p className="text-gray-500 text-sm">Add games from the game detail pages</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
