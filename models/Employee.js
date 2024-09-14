const mongoose=require("mongoose");

const EmployeeSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    }  ,
    email: {
        type: String,
        required: true,
      },
      role:{
        type:String,
        enum:["se","marketer","HR",]
      },
      password: {
        type: String,
        required: true,
      },
})
Employee=mongoose.model("Employee",EmployeeSchema)

module.exports=Employee