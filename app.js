const express = require("express");
const morgan = require("morgan");
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorController');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const requestRouter = require('./routes/requestRoutes');
const  collegeRoutes = require('./routes/collegeRoutes');
const buildingRoutes = require('./routes/buildingRoutes')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); //module that helps us secure HTTP headers returned by Express apps.
const cookieParser = require('cookie-parser');
const mongoSanitize  = require('express-mongo-sanitize');
const xss = require('xss-clean');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs')
// const options = {
//   swaggerDefinition:{...docs},
//   // Paths to files containing OpenAPI definitions
//   apis: ['./routes/*.js'],
// };
// const swaggerSpec = swaggerJSDoc(options);
app.use(cors({ credentials: true, origin: true }));
//  GLOBAL MIDDLEWARES

// SET security HTTP headers
app.use(helmet());

// Development Logging 
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));

// Data sanitization against  NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());
app.use(cookieParser())

// Limit request from same API
const limiter = rateLimit({
  max:1000,
  windowMs:60*60*1000,
  message:'Too many requests from this IP, please try again in an hour!'
});

// app.use('/api', limiter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(docs));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/colleges', collegeRoutes)
app.use('/api/v1/buildings', buildingRoutes);
app.use('*', (req, res, next)=>{
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
