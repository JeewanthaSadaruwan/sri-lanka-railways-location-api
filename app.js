const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const locationRoutes = require('./src/routes/locationRoutes');
const trainRoutes = require('./src/routes/trainRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-docs/info');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', locationRoutes);
app.use('/api/v1', trainRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
