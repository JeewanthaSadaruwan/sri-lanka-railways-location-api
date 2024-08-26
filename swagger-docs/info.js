const paths = require('./path');

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Sri Lanka Railways Location API',
    version: '1.0.0',
    description: 'API for real-time train location tracking',
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
      description: 'Local server',
    },
  ],
  paths: paths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

module.exports = swaggerDoc;
