import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className='menu-explorer' id='menu-explorer'>
      <h2>Browse by Category</h2>
      <div className="menu-category-list" tabIndex={0} aria-label="Food categories">
        {menu_list.map((item, idx) => (
          <div
            key={idx}
            className={`menu-category-item${category === item.menu_name ? ' active' : ''}`}
            tabIndex={0}
            aria-label={item.menu_name}
            title={item.menu_name}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
            }}
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={category === item.menu_name ? "selected" : ""}
            />
            <p>{item.menu_name}</p>
            {category === item.menu_name && <div className="menu-cat-underline"></div>}
          </div>
        ))}
      </div>
      <hr />
      <div className="menu-scroll-hint">← Scroll for more categories →</div>
    </section>
  )
}

export default ExploreMenu
