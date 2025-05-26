import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentFailedPage.css';

const PaymentFailedPage = () => {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        navigate('/payment');
    };

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="payment-failed-container">
            <div className="failed-icon">✕</div>
            <h2>Payment Failed</h2>
            <p>Your payment was not completed successfully.</p>
            
            <div className="possible-reasons">
                <h3>Possible reasons:</h3>
                <ul>
                    <li>Insufficient funds</li>
                    <li>Payment was cancelled</li>
                    <li>Network issues</li>
                </ul>
            </div>
            
            <div className="action-buttons">
                <button 
                    onClick={handleTryAgain}
                    className="try-again-button"
                >
                    Try Again
                </button>
                <button 
                    onClick={handleBackHome}
                    className="home-button"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentFailedPage;
