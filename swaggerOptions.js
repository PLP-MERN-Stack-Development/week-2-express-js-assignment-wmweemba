const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for the Product API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Path where API documentation comments are written
};

const specs = swaggerJsdoc(options);

module.exports = specs;