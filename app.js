// app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// // const { sequelize, User } = require('./models');
// require('dotenv').config();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./routes/userRoute.js";
import session from "express-session";
import authRoute from "./routes/authRoute.js";
import suratJalanRoute from "./routes/suratJalanRoute.js";
import MssqlStore from "connect-mssql-v2";
import strconfig from "./dbconfig/strconfig.js";
dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SES_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MssqlStore(strconfig),
    cookie: {
      secure: "auto", // Prevents client-side JavaScript from accessing the cookie
      httpOnly: true, // Recommended for production to ensure cookies are sent over HTTPS
      // maxAge: new Date(Date.now() + 3600000), // 1 hour in milliseconds (1000 ms * 60 seconds * 60 minutes)
      maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
      // maxAge: 1 * 60 * 1000, // 5 minutes in milliseconds
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(UserRoute);
app.use(authRoute);
app.use(suratJalanRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
