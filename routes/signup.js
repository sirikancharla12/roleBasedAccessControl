const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');


const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the username or email is already taken
    const validateEmployeename = async (username) => {
      const employee = await Employee.findOne({ username });
      return !employee; // return true if the username is available
    };

    const validateEmail = async (email) => {
      const employee = await Employee.findOne({ email });
      return !employee; // return true if the email is available
    };

    let nameNotTaken = await validateEmployeename(username);
    if (!nameNotTaken) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    let emailNotRegistered = await validateEmail(email);
    if (!emailNotRegistered) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const newEmployee = new Employee({
      username,
      email,
      role,
      password: hashedPassword,
    });

    await newEmployee.save();
    return res.status(201).send("Employee registered successfully");
  } catch (error) {
    console.error("Error during registration:", error); // Log the error details
    return res.status(500).json({ message: "Error during registration", error: error.message });
  }
};

module.exports=signup