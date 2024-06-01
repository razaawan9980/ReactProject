const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoute = require('./routes/index');

// Create an Express application
const app = express();

// Set up middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());
app.use(productRoute);

// Connect to MongoDB
mongoose.connect('mongodb+srv://razaawanofficial:raza123@clustercoalassignment.wrk4deq.mongodb.net/Shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
