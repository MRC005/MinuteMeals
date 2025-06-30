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
  isVeg = true,
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
        <img
          className={`food-item-image${imgLoaded ? ' loaded' : ''}`}
          src={url + "/images/" + image}
          alt={name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ filter: imgLoaded ? 'none' : 'blur(10px)', transition: 'filter 0.4s' }}
        />
        {isBestSeller && <span className="food-item-badge best-seller">Best Seller</span>}
        {offer && <span className="food-item-badge offer">{offer}</span>}
        <span className={`food-item-badge veg-type ${isVeg ? 'veg' : 'nonveg'}`}>{isVeg ? 'Veg' : 'Non-Veg'}</span>
        {category && <span className="food-item-cat">{category}</span>}
        <button
          className={`food-item-fav ${favorite ? 'active' : ''}`}
          aria-label="Toggle favorite"
          onClick={() => setFavorite(f => !f)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill={favorite ? "#e74c3c" : "none"} stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-6.5-5.5-9-9.1C-1.5 7.5 2.5 2.5 7 5.1c1.7 1 3 2.9 3 2.9s1.3-1.9 3-2.9c4.5-2.6 8.5 2.4 4 6.8C18.5 15.5 12 21 12 21z"/>
          </svg>
        </button>
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
        <div className="food-item-price-rating">
          <p className="food-item-price">₹{price}</p>
          <img src={assets.rating_starts} alt="Rating" />
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
