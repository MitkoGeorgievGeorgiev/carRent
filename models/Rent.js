const mongoose=require('mongoose')
const Car=require('../models/Car')
const User=require('../models/User')

ObjectId=mongoose.Schema.Types.ObjectId

const rentSchema= mongoose.Schema({
    days:{type:Number,requiered:true},
    car:{type:ObjectId,requiered:true,ref:'Car'},
    owner:{type:ObjectId,requiered:true,ref:'User'}
})

const Rent=mongoose.model('Rent',rentSchema)
module.exports=Rent