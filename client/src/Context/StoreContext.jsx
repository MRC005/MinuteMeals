import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const StoreContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const StoreContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState("");
    const [cart, setCart] = useState({});
    const [menu, setMenu] = useState([]);

    const addItemToCart = async (foodId) => {
        setCart(prev => ({
            ...prev,
            [foodId]: prev[foodId] ? prev[foodId] + 1 : 1
        }));
        if (authToken) {
            try {
                await axios.post(`${API_BASE_URL}/api/cart/add`, { itemId: foodId }, { headers: { token: authToken } });
            } catch (error) {
                console.error("Failed to add to cart:", error);
            }
        }
    };

    const removeItemFromCart = async (foodId) => {
        setCart(prev => ({
            ...prev,
            [foodId]: prev[foodId] > 1 ? prev[foodId] - 1 : 0
        }));
        if (authToken) {
            try {
                await axios.post(`${API_BASE_URL}/api/cart/remove`, { itemId: foodId }, { headers: { token: authToken } });
            } catch (error) {
                console.error("Failed to remove from cart:", error);
            }
        }
    };

    const getCartTotal = () => {
        return Object.entries(cart).reduce((sum, [id, qty]) => {
            const food = menu.find(item => item._id === id);
            return food ? sum + food.price * qty : sum;
        }, 0);
    };

    const fetchMenu = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/food/list`);
            setMenu(res.data.data);
        } catch (error) {
            console.error("Failed to fetch menu:", error);
        }
    };

    const fetchCart = async (token) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/cart/get`, {}, { headers: { token } });
            setCart(res.data.cartData || {});
        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    };

    useEffect(() => {
        fetchMenu();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setAuthToken(storedToken);
            fetchCart(storedToken);
        }
    }, []);

    const contextValue = {
        authToken,
        setAuthToken,
        API_BASE_URL,
        menu,
        cart,
        setCart,
        addItemToCart,
        removeItemFromCart,
        getCartTotal
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
