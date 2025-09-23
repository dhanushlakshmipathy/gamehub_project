import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  StarIcon,
  HeartIcon,
  PlusIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'

export default function GameCard({ game }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLikeToggle = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    try {
      return format(new Date(dateString), 'yyyy');
    } catch {
      return dateString;
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = Math.round(rating / 2); // Convert to 5-star scale
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`w-3 h-3 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
          />
        ))}
        <span className="text-xs text-gray-400 ml-1">{rating?.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="group card card-hover relative overflow-hidden">
      <Link to={`/games/${game._id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={game.cover || 'https://via.placeholder.com/400x600?text=No+Image'}
            alt={game.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-gray-500 text-sm">Loading...</div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={handleLikeToggle}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-white" />
                )}
              </button>
              <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm">
                <PlusIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Rating badge */}
          {game.rating && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded-lg px-2 py-1 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs font-semibold">{game.rating.toFixed(1)}</span>
              </div>
            </div>
          )}

          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="absolute top-2 right-2">
              <div className="flex flex-wrap gap-1">
                {game.platforms.slice(0, 3).map((platform, index) => (
                  <span
                    key={index}
                    className="badge badge-gray text-xs opacity-90"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors duration-200">
            {game.title}
          </h3>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(game.released)}</span>
            </div>
            {game.ratingCount > 0 && (
              <span className="text-xs text-gray-500">
                {game.ratingCount} reviews
              </span>
            )}
          </div>

          {/* Rating stars */}
          {renderStars(game.rating)}

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {game.genres.slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="badge badge-primary text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Description preview */}
          {game.description && (
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {game.description.length > 100 
                ? `${game.description.substring(0, 100)}...` 
                : game.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
