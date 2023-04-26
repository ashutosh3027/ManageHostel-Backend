const express = require("express");
const AppError = require("../utils/AppError");


const handleJWTError = err=>new AppError('Invalid token. Please log in again!', 401);
const handleTokenExpiredError = err=>new AppError('Token Expired. Please log in again!', 401);
const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR", err);
    res.status(err.statusCode).json({
      status: err.status,
      message: "Something went very wrong!!",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  process.env.NODE_ENV = process.env.NODE_ENV.trim();
  if(err.name==='JsonWebTokenError')  err = handleJWTError(err);
  if(err.name==='TokenExpiredError') err = handleTokenExpiredError(err);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
