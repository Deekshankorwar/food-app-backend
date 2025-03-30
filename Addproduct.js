const mongoose=require('mongoose')
const Addproduct=mongoose.Schema({
    product:{type:String,require:true},
    price:{type:String,require:true},
    description:{type:String,require:true},
    
})
module.exports=mongoose.model('Addproduct',Addproduct)