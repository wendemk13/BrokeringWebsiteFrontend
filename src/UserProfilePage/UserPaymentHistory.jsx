import React, { useEffect, useState } from 'react'
import './UserPaymentHistory.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UserPaymentHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user_id } = useParams();
  const navigate = useNavigate(); // Add this hook
  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const fetchPendingListings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/history/${user_id}`);
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPendingListings();
  }, [user_id]);

  // Function to handle row click
  const handleRowClick = (txRef) => {
    navigate(`/CheckPaymentPage/${txRef}`);
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (transactions.length === 0) return <div>You Have No Transaction History.</div>;

  return (
    <div>
      <div>
        <h3 className="section-title">{t(`Payment Histories`)}</h3>
        <div className="transaction-card card">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>{t(`ID`)}</th>
                  <th>{t(`Amount`)}</th>
                  <th>{t(`Date`)}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr 
                    key={transaction.tx_ref} 
                    onClick={() => handleRowClick(transaction.tx_ref)}
                    style={{ cursor: 'pointer' }} // Add pointer cursor
                  >
                    <td>{transaction.tx_ref}</td>
                    <td>{transaction.amount} {t(`ETB`)}</td>
                    <td>{transaction.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default UserPaymentHistory;