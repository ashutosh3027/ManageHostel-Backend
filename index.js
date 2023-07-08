const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");// loads environment variables from a .env file into process.env
dotenv.config({ path: "./config.env" });
// like any variable is not declare then it will give user frinedlly error.
process.on('uncaughtException', err=>{
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down....' );
  console.log(err.name, err.message);
  process.exit(1); //1 for uncaugth rejection and 0 for success
})
mongoose.set('strictQuery', true);
const app = require("./app");
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// mongoose.connect(DB, {
const DB = process.env.DATABASE
var dbUrl = DB.replace('<password>', process.env.PASSWORD)
if(process.env.NODE_ENV==='development'){
  dbUrl= process.env.DATABASE_LOCAL
}
mongoose.connect(dbUrl, {
// mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser:true
}).then((con)=>{
//   console.log(con.connection);
  console.log('DB connection successful!');
})
console.log(process.env.NODE_ENV);


//https://managehostel-api.onrender.com


const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// when  db connections are not working properlly;
process.on('unhandledRejection', (err)=>{
  console.log('UNHANDLED REJECTION! 🔥 Shutting down....');
  console.log(err.name, err.message);
  server.close(()=>{
    process.exit(1); //1 for uncaugth rejection and 0 for sucess
  })
})
