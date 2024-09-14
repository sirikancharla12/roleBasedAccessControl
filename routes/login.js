const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');


const Employeelogin=async(req,res)=>{
    let {username,password,role}=req.body;
    const employee=await Employee.findOne({username});
    if(!employee){
        return res.send("employee not found")
    }{

    }
    if(employee.role!==role){
        return res.send("make sure u r on the right portal")
    }{

    }
let isMatch=await bcrypt.compare(password,employee.password)
if(isMatch){
    let token=jwt.sign({
        username:employee.username,
        role:employee.role,
        email:employee.email    
    },process.env.JWT_SECRET,{expiresIn:"3 days"})

    let result = {
        username: employee.name,
        role: employee.role,
        email: employee.email,
        token: `Bearer ${token}`
    };
    
    // Send response with status code and message
    return res.status(200).json({
        message: "You logged in successfully",
        data: result
    });
    
}else{
    return res.send("incorrect password")
}

}
module.exports=Employeelogin