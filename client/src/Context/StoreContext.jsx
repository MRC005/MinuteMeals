import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const StoreContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [menu, setMenu] = useState([]);

    const addToCart = (foodId) => {
        setCartItems(prev => ({
            ...prev,
            [foodId]: prev[foodId] ? prev[foodId] + 1 : 1
        }));
    };

    const removeFromCart = (foodId) => {
        setCartItems(prev => ({
            ...prev,
            [foodId]: prev[foodId] > 1 ? prev[foodId] - 1 : 0
        }));
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((sum, [id, qty]) => {
            const food = menu.find(item => item._id === id);
            return food ? sum + food.price * qty : sum;
        }, 0);
    };

    const fetchMenu = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/food/list`);
            setMenu(res.data.data);
        } catch (error) {
            setMenu([]);
        }
    };

    useEffect(() => {
        fetchMenu();
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    const url = API_BASE_URL;

    const contextValue = {
        token, setToken,
        url,
        menu, // <--- THIS IS THE ARRAY OF FOOD ITEMS
        cartItems, setCartItems,
        addToCart, removeFromCart,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
