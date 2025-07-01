import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
  const { menu = [] } = useContext(StoreContext);

  if (menu && menu.length > 0) {
    console.log('menu item example:', menu[0]);
  } else {
    console.log('menu is empty or undefined:', menu);
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {(menu || [])
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
  );
};

export default FoodDisplay;
