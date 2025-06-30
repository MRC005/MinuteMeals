import { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import './MyOrders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const statusColors = {
    delivered: "#27ae60",
    pending: "#f39c12",
    cancelled: "#e74c3c",
    processing: "#7F3FF7"
};

const MyOrders = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, {
                headers: { token },
            });
            setData(response.data.data);
        } catch (error) {
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel" />
                            <div className="my-orders-info">
                                <div className="my-orders-items">
                                    {order.items.map((item, idx) =>
                                        <span key={idx}>{item.name} × {item.quantity}{idx < order.items.length - 1 ? ', ' : ''}</span>
                                    )}
                                </div>
                                <div className="my-orders-meta">
                                    <span className="my-orders-date">
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
                                            : ""}
                                    </span>
                                    <span className="my-orders-status" style={{ color: statusColors[order.status?.toLowerCase()] || "#7F3FF7" }}>
                                        ● <b>{order.status}</b>
                                    </span>
                                </div>
                            </div>
                            <p className="my-orders-amount">₹{order.amount}</p>
                            <p className="my-orders-count">Items: {order.items.length}</p>
                        </div>
                    ))
                ) : (
                    <div className="my-orders-empty">
                        <img src={assets.parcel_icon} alt="No orders" />
                        <p>No orders found yet.</p>
                        <a href="/#explore-menu" className="my-orders-browse-btn">Browse Menu</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
