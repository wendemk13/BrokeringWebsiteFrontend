import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Transactions.css'

function Transactions() {
const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

     useEffect(() => {
  const fetchPendingListings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/alltransactions`);
            setTransactions(response.data.transactions.slice(0,7));
      setLoading(false);
      console.log(response.data.transactions)
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  fetchPendingListings();
}, []);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div>
                    <h3 class="section-title">Recent Transactions</h3>
     <div class="transaction-card card">
              <div class="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Item</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                                    <tbody>

        {
            transactions.map(transaction=>(
                    <>
                    <tr>
                      <td>{transaction.tx_ref}</td>
                      <td>John Doe</td>
                      <td>3-Bedroom Apartment</td>
                      <td>{transaction.amount} ETB</td>
                      <td>
                        <span class="badge badge-success">{transaction.status}</span>
                      </td>
                      <td>{transaction.created_at}</td>
                    </tr>
                    </>
            ))
        }
       
                    
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>    
    </div>
  )
}

export default Transactions



