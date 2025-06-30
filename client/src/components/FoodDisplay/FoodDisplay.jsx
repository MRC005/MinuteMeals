import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list
          .filter(food => category === "All" || food.category === category)
          .map(food => (
            <FoodItem
              key={food._id}
              id={food._id}
              name={food.name}
              description={food.description}
              price={food.price}
              image={food.image}
              category={food.category}
              isBestSeller={food.isBestSeller}
              offer={food.offer}
              isVeg={food.isVeg}
              stock={food.stock}
              rating={food.rating}
            />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
