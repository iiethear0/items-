const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const apiRoutes = require('./routes/api');

const app = express();
const port = 4000; // The port number for the API server

// Middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD API',
            version: '1.0.0',
            description: 'A CRUD API with Swagger documentation',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to API documentation
};

app.get('/', (req, res) => {
    res.send('Welcome to the API server with Swagger!');
  });

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(`Swagger docs available at http://localhost:${port}/api-docs`);

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
