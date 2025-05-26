import React from 'react'
import { useParams } from 'react-router-dom'

function UserTransactions() {
  const id=useParams.user_id;
  return (
    <div>
      user {id}
      UserTransactions
      UserTransactions
      UserTransactionsUserTransactions
      UserTransactions
      UserTransactions
      UserTransactions
      UserTransactions
    </div>
  )
}

export default UserTransactions
