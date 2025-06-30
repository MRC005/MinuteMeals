import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        window.location.reload();
    };

    const handleMenuClick = (menuName) => {
        setMenu(menuName);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo-link">
                <img src={assets.logo} alt="MinuteMeals logo" className="logo" />
            </Link>

            {/* Hamburger for mobile */}
            <button
                className="navbar-hamburger"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
                <span />
                <span />
                <span />
            </button>

            {/* Desktop menu */}
            {location.pathname === "/" && (
                <ul className="navbar-menu">
                    <Link
                        to="/"
                        onClick={() => handleMenuClick("home")}
                        className={menu === "home" ? "active" : ""}
                    >
                        home
                    </Link>
                    <a
                        href="#explore-menu"
                        onClick={() => handleMenuClick("menu")}
                        className={menu === "menu" ? "active" : ""}
                    >
                        menu
                    </a>
                    <a
                        href="#footer"
                        onClick={() => handleMenuClick("contact-us")}
                        className={menu === "contact-us" ? "active" : ""}
                    >
                        contact us
                    </a>
                </ul>
            )}

            {/* Mobile menu */}
            <div className={`navbar-mobile-menu-bg${mobileMenuOpen ? " open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
            <ul className={`navbar-mobile-menu${mobileMenuOpen ? " open" : ""}`}>
                <li>
                    <Link
                        to="/"
                        onClick={() => handleMenuClick("home")}
                        className={menu === "home" ? "active" : ""}
                    >
                        home
                    </Link>
                </li>
                <li>
                    <a
                        href="#explore-menu"
                        onClick={() => handleMenuClick("menu")}
                        className={menu === "menu" ? "active" : ""}
                    >
                        menu
                    </a>
                </li>
                <li>
                    <a
                        href="#footer"
                        onClick={() => handleMenuClick("contact-us")}
                        className={menu === "contact-us" ? "active" : ""}
                    >
                        contact us
                    </a>
                </li>
                <li>
                    {!token ? (
                        <button className="navbar-mobile-btn" onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}>sign up</button>
                    ) : (
                        <>
                            <button className="navbar-mobile-btn" onClick={() => { navigate("/myorders"); setMobileMenuOpen(false); }}>My Orders</button>
                            <button className="navbar-mobile-btn" onClick={logout}>Logout</button>
                        </>
                    )}
                </li>
            </ul>

            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart" aria-label="View cart">
                        <img src={assets.basket_icon} alt="Cart" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign up</button>
                ) : (
                    <div className="navbar-profile" tabIndex={0}>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/myorders")}>
                                <img src={assets.bag_icon} alt="" />
                                Orders
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
