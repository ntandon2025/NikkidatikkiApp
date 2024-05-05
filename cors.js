const cors = require('cors');

// List of allowed origins for flexibility, e.g., different environments like development, staging, production
const allowedOrigins = [
    'https://mazemirage.netlify.app',  // Production front-end URL
    'http://localhost:3000',           // Local development URL
    'https://staging-mazemirage.netlify.app' // Staging URL, if applicable
];

// CORS options setup
const corsOptions = {
    origin: function (origin, callback) {
        // Check if the incoming origin is in the list of allowed origins
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Credentials are supported, like cookies, authorization headers, etc.
    optionsSuccessStatus: 200 // For legacy browser support
};

// Function to setup CORS middleware
const setupCORS = (app) => {
    app.use(cors(corsOptions));
}

module.exports = setupCORS;
