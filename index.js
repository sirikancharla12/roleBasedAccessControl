const express = require("express");
const dotenv = require('dotenv');
const connectdb = require("./db/db");
const signup = require("./routes/signup");
const Employeelogin = require("./routes/login");
// const bcrypt=require("bcrypt")
const { employeeAuth, checkRole } = require("./middlewares/middleware");

dotenv.config();
const app = express();

app.use(express.json());

connectdb();

// Signup routes
app.post("/register-se", (req, res) => {
  signup(req, res);
});

app.post("/register-marketer", (req, res) => {
  signup(req, res);
});

app.post("/register-hr", (req, res) => {
  signup(req, res);
});

// Login routes
app.post("/login-se", (req, res) => {
  Employeelogin(req, res);
});

app.post("/login-hr", (req, res) => {
  Employeelogin(req, res);
});

app.post("/login-marketer", (req, res) => {
  Employeelogin(req, res);
});

// Protected routes
app.get("/se-protected", employeeAuth, checkRole(["se"]), (req, res) => {
  res.json(`Welcome ${req.user.username}`);
});

app.get("/marketers-protected", employeeAuth, checkRole(["marketer"]), (req, res) => {
  res.json(`Welcome ${req.user.username}`);
});

app.get("/hr-protected", employeeAuth, checkRole(["hr"]), (req, res) => {
  res.json(`Welcome ${req.user.username}`);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
