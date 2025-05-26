// import React, { useState, useEffect } from 'react';
// import './ChapaPaymentForm.css'; // Import CSS for styling
// import Pay from './Pay';

// const ChapaPaymentForm = () => {
//   const [formData, setFormData] = useState({
//     fname: '',
//     lname: '',
//     email: '',
//     amount: '',
//   });

//   const [txRef, setTxRef] = useState(''); // For transaction reference

//   // Generate unique transaction ref when component loads or on every payment
//   useEffect(() => {
//     generateTxRef();
//   }, []);

//   const generateTxRef = () => {
//     // Example: chapa_tx_ + current timestamp + random 4-digit number
//     const ref = 'chapa_tx_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000);
//     setTxRef(ref);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Form submitted! (Integrate payment here)');
//     // You can trigger payment logic here
//   };

//   return (
//     <div className="payment-form-container">
//       <h2>Make a Payment</h2>
//       <form className="payment-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>First Name</label>
//           <input
//             type="text"
//             name="fname"
//             value={formData.fname}
//             onChange={handleChange}
//             required
//             placeholder="Enter your first name"
//           />
//         </div>

//         <div className="form-group">
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lname"
//             value={formData.lname}
//             onChange={handleChange}
//             required
//             placeholder="Enter your last name"
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="form-group">
//           <label>Amount (ETB)</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             required
//             placeholder="Enter amount in ETB"
//           />
//         </div>

//         {/* Optional: Submit button if needed */}
//         {/* <button type="submit" className="submit-btn">Pay Now</button> */}
//       </form>

//       {/* Pass txRef (transaction reference) to Pay */}
//       <Pay
//         className="submit-btn"
//         fname={formData.fname}
//         lname={formData.lname}
//         email={formData.email}
//         amount={formData.amount}
//         tx_ref={txRef} 
//       />
//     </div>
//   );
// };

// export default ChapaPaymentForm;
import React, { useState, useEffect } from 'react';
import './ChapaPaymentForm.css'; // Import CSS for styling
import Pay from './Pay';

const ChapaPaymentForm = ({firstname,lastname,email}) => {
  const [formData, setFormData] = useState({
    fname: firstname,
    lname: lastname,
    email: email,
    amount: '',
  });

  const [txRef, setTxRef] = useState(''); // For transaction reference
  const [isFormValid, setIsFormValid] = useState(false); // To check form validity

  // Generate unique transaction ref when component loads or on every payment
  useEffect(() => {
    generateTxRef();
  }, []);

  useEffect(() => {
    // Check if all required fields are filled to enable payment
    const { fname, lname, email, amount } = formData;
    // setIsFormValid(fname && lname && email && amount);
    setIsFormValid(amount);

  }, [formData]);

  const generateTxRef = () => {
    // Example: chapa_tx_ + current timestamp + random 4-digit number
    const ref = 'chapa_tx_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000);
    setTxRef(ref);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Integrate payment logic here)');
    // Trigger payment logic here, for example:
    // You can initiate the payment processing API
  };

  return (
    <div className="payment-form-container">
      {/* <h2>Make a Payment</h2> */}
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          {/* <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          /> */}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          {/* <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          /> */}
        </div>

        <div className="form-group">
          {/* <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          /> */}
        </div>

        <div className="form-group">
          <label>Amount (ETB)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="Enter amount in ETB"
          />
        </div>

        {/* Optional: Submit button if needed */}
        {/* <button type="submit" className="submit-btn">Pay Now</button> */}
      </form>

      {/* Show the Pay component only when the form is valid and txRef is available */}
      {isFormValid && txRef && (
        <Pay
          className="submit-btn"
          fname={firstname}
          lname={lastname}
          email={email}
          amount={formData.amount}
          tx_ref={txRef} 
        />
      )}
    </div>
  );
};

export default ChapaPaymentForm;
