const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const PORT=3000
const app=express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("Db connected successfully")
).catch(
    (err)=>console.log(err)
)

app.get('/',async(req,res)=>{
    try{
       res.send("welcomeee too backend")
    }
    catch(err){
        console.log
    }
})
app.post('/register',async(req,res)=>{
    const{user,email,password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
           const newUser=new User({user,email,password:hashPassword})
           await newUser.save()
           console.log("new user is regitered successfully")
           res.json({message:'User created'})
    }
    catch(err)
    {
        console.log(err)
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({message:"invalid credential"});
        
        }
         res.json({message:"login successsfull",username:user.username});
}
    catch(err)

    {
        console.log(err)
    }
})


app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("server is running on port\dee:"+PORT)
})