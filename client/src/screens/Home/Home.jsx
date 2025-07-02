import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
    const [category, setCategory] = useState("All");
    const [locationName, setLocationName] = useState('Detecting location...');

    return (
        <div>
            <Header setLocation={setLocationName} />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} location={locationName} />
        </div>
    )
}

export default Home
