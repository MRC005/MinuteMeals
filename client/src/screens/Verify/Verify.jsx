import { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext)
    const navigate = useNavigate()
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.post(url + "/api/order/verify", { 
                  success, 
                  orderId 
                });
                
                if (response.data.success) {
                    localStorage.removeItem('cartItems');
                    navigate("/myorders");
                } else {
                    setError("Payment verification failed. Redirecting to home...");
                    setTimeout(() => navigate("/"), 2500);
                }
            } catch (err) {
                setError("Network error. Redirecting to home...");
                setTimeout(() => navigate("/"), 2500);
            }
        };
        
        if (success && orderId) {
            verifyPayment();
        }
    }, [success, orderId, url, navigate]);

    if (error) {
        return (
            <div className="verify">
                <Loader text={error} />
            </div>
        );
    }

    return (
        <div className="verify">
            <Loader text="Verifying your payment..." />
        </div>
    );
}

export default Verify;
