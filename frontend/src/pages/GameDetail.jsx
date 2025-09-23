import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { 
  StarIcon,
  HeartIcon,
  PlusIcon,
  CalendarIcon,
  DevicePhoneMobileIcon,
  TagIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'

export default function GameDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [userRating, setUserRating] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(0)

  useEffect(() => {
    fetchGameDetails()
    if (isAuthenticated) {
      checkUserStatus()
    }
  }, [id, isAuthenticated])

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games/${id}`)
      setGame(response.data)
      
      // Fetch reviews for this game
      try {
        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews?game=${id}`)
        setReviews(reviewsResponse.data)
      } catch (err) {
        console.log('No reviews endpoint available yet')
      }
    } catch (err) {
      console.error('Error fetching game:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkUserStatus = async () => {
    // Check if user has this game in wishlist, rated it, etc.
    // This would require backend endpoints
  }

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) return
    setIsInWishlist(!isInWishlist)
    // TODO: API call to add/remove from wishlist
  }

  const handleRating = async (rating) => {
    if (!isAuthenticated) return
    setUserRating(rating)
    // TODO: API call to save rating
  }

  const submitReview = async (e) => {
    e.preventDefault()
    if (!isAuthenticated || !reviewText.trim()) return
    
    // TODO: API call to submit review
    setShowReviewForm(false)
    setReviewText('')
    setReviewRating(0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA'
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy')
    } catch {
      return dateString
    }
  }

  const renderStars = (rating, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={interactive ? () => handleRating(star) : undefined}
            disabled={!interactive}
            className={interactive ? 'hover:scale-110 transition-transform' : ''}
          >
            {star <= rating ? (
              <StarSolidIcon className={`${size} text-yellow-400`} />
            ) : (
              <StarIcon className={`${size} text-gray-600`} />
            )}
          </button>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="spinner"></div>
          <p className="text-gray-400">Loading game details...</p>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-300 mb-4">Game not found</h1>
        <Link to="/" className="btn btn-primary">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back to Games</span>
      </Link>

      {/* Game Header */}
      <div className="card overflow-hidden">
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-gray-900 to-gray-800">
          {game.cover && (
            <img
              src={game.cover}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          
          <div className="relative h-full flex items-end p-8">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Game Cover */}
              <div className="flex-shrink-0">
                <img
                  src={game.cover || 'https://via.placeholder.com/300x400?text=No+Image'}
                  alt={game.title}
                  className="w-32 md:w-48 aspect-[3/4] object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Game Info */}
              <div className="flex-1 space-y-4 text-white">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">{game.title}</h1>
                  {game.released && (
                    <div className="flex items-center gap-2 text-gray-300 mb-4">
                      <CalendarIcon className="w-5 h-5" />
                      <span className="text-lg">{formatDate(game.released)}</span>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Rating:</span>
                    {renderStars(Math.round(game.rating / 2) || 0)}
                    <span className="text-yellow-400 font-semibold">
                      {game.rating ? game.rating.toFixed(1) : 'N/A'}
                    </span>
                    {game.ratingCount > 0 && (
                      <span className="text-gray-400 text-sm">
                        ({game.ratingCount} reviews)
                      </span>
                    )}
                  </div>
                </div>

                {/* Platforms & Genres */}
                <div className="flex flex-wrap gap-4">
                  {game.platforms && game.platforms.length > 0 && (
                    <div className="flex items-center gap-2">
                      <DevicePhoneMobileIcon className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {game.platforms.map((platform, index) => (
                          <span key={index} className="badge badge-gray text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {game.genres && game.genres.length > 0 && (
                    <div className="flex items-center gap-2">
                      <TagIcon className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {game.genres.map((genre, index) => (
                          <span key={index} className="badge badge-primary text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {game.description && (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-white mb-4">About This Game</h2>
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: game.description.replace(/\n/g, '<br />') 
                }}
              />
            </div>
          )}

          {/* Reviews Section */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                Reviews
              </h2>
              {isAuthenticated && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="btn btn-primary"
                >
                  Write a Review
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Rating
                    </label>
                    {renderStars(reviewRating, true)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your thoughts about this game..."
                      className="textarea h-24"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowReviewForm(false)}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {review.user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{review.user?.username}</p>
                          {renderStars(review.rating, false, 'w-4 h-4')}
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No reviews yet. Be the first to review this game!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Actions */}
          {isAuthenticated && (
            <div className="card p-6">
              <h3 className="font-semibold text-white mb-4">Your Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleWishlistToggle}
                  className={`w-full btn flex items-center justify-center gap-2 ${
                    isInWishlist ? 'btn-secondary' : 'btn-ghost'
                  }`}
                >
                  {isInWishlist ? (
                    <HeartSolidIcon className="w-4 h-4" />
                  ) : (
                    <HeartIcon className="w-4 h-4" />
                  )}
                  {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>

                <button className="w-full btn btn-ghost flex items-center justify-center gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Add to List
                </button>

                <div className="border-t border-gray-700 pt-3">
                  <p className="text-sm text-gray-400 mb-2">Rate this game:</p>
                  {renderStars(userRating, true)}
                </div>
              </div>
            </div>
          )}

          {/* Game Stats */}
          <div className="card p-6">
            <h3 className="font-semibold text-white mb-4">Game Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Views</span>
                <span className="text-white flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  {Math.floor(Math.random() * 10000)} {/* Mock data */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Wishlisted</span>
                <span className="text-white">{Math.floor(Math.random() * 1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reviews</span>
                <span className="text-white">{game.ratingCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="card p-6">
            <h3 className="font-semibold text-white mb-4">Share This Game</h3>
            <button className="w-full btn btn-ghost flex items-center justify-center gap-2">
              <ShareIcon className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
