import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This imports the CSS correctly
import App from './App';
// Add a new route for Orders (Optional but recommended for MongoDB)
const orderRoutes = require("./routes/orderRoutes"); 
app.use("/api/orders", orderRoutes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);