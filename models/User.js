const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Rent = require('../models/Rent')
const Car=require('../models/Car')
ObjectId=mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    rents:{type:ObjectId,ref:'Rent'},
    roles: [{ type: mongoose.Schema.Types.String }]
});

userSchema.method({
    authenticate: function (pass) {
        return encryption.generateHashedPass(this.salt, pass) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);
// TODO: Create an admin at initialization here
User.seedAdminUser=()=>{
User.find()
    .then(user=>{
        if(user.length===0){
            
                const salt=encryption.generateSalt()
                const hashedPass=encryption.generateHashedPassword(salt,'123')
    
                 return User.create({
                    username:'admin',
                    hashedPass,
                    firstName:'admin',
                    lastName:'admin',
                    salt,
                    roles:['Admin']
                }).catch(err=>console.error(err))
            }
          
        
    })
    .catch(console.error)
}
module.exports = User;
