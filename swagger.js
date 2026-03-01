const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Perempuan AMAN API',
    description: 'Auto-generated API Documentation (FastAPI style) for Perempuan AMAN Backend',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js']; // Pass the entry point or route files

// Generate swagger_output.json automatically
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger documentation auto-generated successfully.');
});
