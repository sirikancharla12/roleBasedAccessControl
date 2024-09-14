const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");


const employeeAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"]; 
  
  if (!authHeader) {
    return res.status(401).send("Not authorized. No token provided."); 
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token."); 
    }
    
    
    req.user = decoded; 
    console.log("Token verified");
    next();
  });
};


const checkRole = (roles) => {
  return async (req, res, next) => {
    const { username } = req.user;
    
    try {
      const employee = await Employee.findOne({ username });
      
      if (!employee) {
        return res.status(403).send("Access denied. User not found.");
      }
      
      console.log("Checking role:", employee.role, "against:", roles); 
      
      
      next(); 
    } catch (error) {
      return res.status(500).send("Server error while checking role.");
    }
  };
};

module.exports = { checkRole,employeeAuth };

