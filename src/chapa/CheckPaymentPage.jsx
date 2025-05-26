




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiDownload,
  FiClock,
  FiDollarSign,
  FiCalendar
} from 'react-icons/fi';
import './PaymentSuccessPage.css';

const CheckPaymentPage = () => {
  const { txRef } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/verify/${txRef}`);
        if (res.data.status === 'success') {
          const payment = res.data.data;
          setPaymentData(payment);

         
        } else {
          setError('Payment verification failed');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [txRef]);

  const handleDownloadReceipt = async () => {
    setDownloadLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/payment/receipt/${txRef}`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${txRef}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Receipt download error:', err);
      setError('Failed to download receipt. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
        <p>Verifying your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>{error}</h2>
        <button onClick={() => navigate('/')} className="primary-button">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="payment-success-container"
    >
      <div className="success-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <FiCheckCircle className="success-icon" />
        </motion.div>
        <h1> Successful Payment!</h1>
        <p className="success-message">
         Your transaction has been completed successfully.
        </p>
      </div>

      <div className="receipt-card">
        <h3>Payment Receipt</h3>

        <div className="receipt-details">
          <div className="detail-item">
            <FiDollarSign className="detail-icon" />
            <div>
              <span className="detail-label">Amount</span>
              <span className="detail-value">
                {paymentData.amount} {paymentData.currency}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <FiCalendar className="detail-icon" />
            <div>
              <span className="detail-label">Date</span>
              <span className="detail-value">
                {new Date(paymentData.created_at).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <FiClock className="detail-icon" />
            <div>
              <span className="detail-label">Reference</span>
              <span className="detail-value receipt-ref">{paymentData.tx_ref}</span>
            </div>
          </div>

          <div className="detail-item">
            <div>
              <span className="detail-label">Status</span>
              <span className={`status-badge ${paymentData.status}`}>
                {paymentData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="receipt-actions">
          <button
            onClick={handleDownloadReceipt}
            className="action-button downalod-receit-btn"
            disabled={downloadLoading}
          >
            <FiDownload /> {downloadLoading ? 'Downloading...' : 'Download Receipt'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckPaymentPage;

