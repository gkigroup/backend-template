const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const cors = require('cors');
const colors = require('colors');

// Security imports
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Initial app
const app = express();

// Connect to database
connectDB();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Body parser
app.use(express.json());
// Enable CORS
app.use(cors());

// Sanitize data - prevent NoSQL injections
app.use(mongoSanitize());
// Set security headers
app.use(helmet({ contentSecurityPolicy: false }));
// Prevent XSS attacks
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //  10 mins
  max: 100,
});
app.use(limiter);
// Prevent http param pollution
app.use(hpp());

// Routes
const authRoutes = require('./api/auth/auth.routes');
app.use('/api/v1/auth', authRoutes);
const contactRoutes = require('./api/contact/contact.routes');
app.use('/api/v1/contacts', contactRoutes);
const userRoutes = require('./api/user/user.routes');
app.use('/api/v1/users', userRoutes);

// Custom ErrorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
