import React, { useContext, useState, useEffect } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const getFavs = () => JSON.parse(localStorage.getItem('favorites') || '{}')

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  stock = 10,
  category,
  rating = 4.2,
  isBestSeller = false,
  isVeg,
  offer = null
}) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)
  const [added, setAdded] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [favorite, setFavorite] = useState(getFavs()[id] || false)

  useEffect(() => {
    const favs = getFavs()
    favs[id] = favorite
    localStorage.setItem('favorites', JSON.stringify(favs))
  }, [favorite, id])

  const handleAdd = () => {
    if (stock === 0) return
    addToCart(id)
    setAdded(true)
    setTimeout(() => setAdded(false), 700)
  }

  return (
    <div className={`food-item${added ? ' food-item-animate' : ''}${stock === 0 ? ' food-item-out' : ''}`}>
      <div className="food-item-image-container">
        {isBestSeller && <span className="food-item-badge best-seller">Best Seller</span>}
        {category && <span className="food-item-cat">{category}</span>}
        <button
          className={`food-item-fav ${favorite ? 'active' : ''}`}
          aria-label="Toggle favorite"
          onClick={() => setFavorite(f => !f)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={favorite ? "#e74c3c" : "#fff"}
            stroke="#e74c3c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: 'block' }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09
                     C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <img
          className={`food-item-image${imgLoaded ? ' loaded' : ''}`}
          src={url + "/uploads/images/" + image}
          alt={name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ filter: imgLoaded ? 'none' : 'blur(10px)', transition: 'filter 0.4s' }}
        />
        {(isVeg === true || isVeg === false || isVeg === "true" || isVeg === "false") && (
          <span className={`food-item-badge veg-type ${(isVeg === true || isVeg === "true") ? 'veg' : 'nonveg'}`}>
            {(isVeg === true || isVeg === "true") ? 'Veg' : 'Non-Veg'}
          </span>
        )}
        {!cartItems[id] ? (
          <img
            className={`add${stock === 0 ? ' disabled' : ''}`}
            onClick={handleAdd}
            src={assets.add_icon_white}
            alt="Add"
            tabIndex={stock === 0 ? -1 : 0}
            aria-disabled={stock === 0}
          />
        ) : (
          <div className="food-item-counter">
            <img
              className="remove-icon"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              className="add-icon"
              onClick={handleAdd}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-row">
          <p className="food-item-name">{name}</p>
          <span className="food-item-rating">{renderStars(rating)} {rating?.toFixed(1)}</span>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-row">
          <p className="food-item-price">₹{price}</p>
          {offer && <span className="food-item-offer-inline">{offer}</span>}
        </div>
      </div>
    </div>
  )
}

function renderStars(rating) {
  const stars = []
  let full = Math.floor(rating)
  let half = rating - full >= 0.5
  for (let i = 0; i < full; i++) stars.push(<span key={i}>★</span>)
  if (half) stars.push(<span key="half">☆</span>)
  while (stars.length < 5) stars.push(<span key={stars.length}>☆</span>)
  return <span className="star-row">{stars}</span>
}

export default FoodItem
