import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiDownload, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './DownloadReceit.css';

function DownloadReceit() {
  const { txRef } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const downloadReceipt = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the PDF from the API
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/payment/receipt/${txRef}`,
          { responseType: 'blob' } // Important for file downloads
        );

        // Create a download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `payment_receipt_${txRef}.pdf`);
        
        // Trigger the download automatically
        document.body.appendChild(link);
        link.click();
        link.remove();

        setSuccess(true);
      } catch (err) {
        console.error('Download error:', err);
        setError(err.response?.data?.message || 'Failed to download receipt');
      } finally {
        setLoading(false);
      }
    };

    downloadReceipt();
  }, [txRef]);

  return (
    <div className="receipt-container">
      <div className="receipt-card">
        <h2>Payment Receipt</h2>
        <p className="transaction-id">Transaction ID: {txRef}</p>

        {loading && (
          <div className="status-message loading">
            <FiLoader className="spin" />
            <span>Preparing your receipt...</span>
          </div>
        )}

        {error && (
          <div className="status-message error">
            <FiAlertCircle />
            <span>{error}</span>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        )}

        {success && (
          <div className="status-message success">
            <FiCheckCircle />
            <span>Receipt downloaded successfully!</span>
            <div className="actions">
              <button 
                onClick={() => window.location.reload()}
                className="action-button"
              >
                <FiDownload /> Download Again
              </button>
              <button 
                onClick={() => window.print()}
                className="action-button"
              >
                Print Receipt
              </button>
            </div>
          </div>
        )}

        <div className="help-text">
          <p>If the download didn't start automatically:</p>
          <button 
            onClick={() => {
              window.open(
                `${process.env.REACT_APP_API_URL}/api/payment/receipt/${txRef}`,
                '_blank'
              );
            }}
            className="manual-download"
          >
            Click here to download manually
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadReceit;