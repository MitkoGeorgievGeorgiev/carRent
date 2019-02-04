const User  = require('mongoose').model('User')
const encryption = require('../util/encryption')
const Rent =require('../models/Rent')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register')
    },
    registerPost:  (req, res) => {
       const reqUser=req.body

       if(!reqUser.username || !reqUser.password || !reqUser.repeatPassword){
           reqUser.error='Fill all the fields!'
           res.render('user/register',reqUser)
           return
       }
       if(reqUser.password!==reqUser.repeatPassword){
        reqUser.error='Passwords should match!'
           res.render('user/register',reqUser)
           return
       }
       const salt = encryption.generateSalt()
       const hashedPass =encryption.generateHashedPass(salt,reqUser.password)

       User.create({
        username:reqUser.username,
        hashedPass,
        firstName:reqUser.firstName,
        lastName:reqUser.lastName,
        salt,
        roles:['User']
       }).then((user)=>{
           req.logIn(user,(err)=>{
               if (err){
                   reqUser.error=err
               res.render('user/register',reqUser)
               return
               }
               else{
                   res.redirect('/')
               }
           })
       }).catch(err=>{
        reqUser.error='Username is already busy'
        res.render('user/register',reqUser)
       }
       )
       
    },
    rents:(req,res)=>{
        Rent.find({owner:req.user._id}).populate('car')
        .then(rents=>{
            res.render('user/rented',{rents})
            
        })
        .catch(err=>console.log(err)
        )


    },
    logout: (req, res) => {
        
        
        req.logout()
        res.redirect('/')
    },
    loginGet: (req, res) => {
        res.render('user/login')
    },
    loginPost: (req, res) => {
        let reqUser=req.body

        
        
         User.findOne({username:reqUser.username}).then(user=>{
             
             
            if(!user){
                reqUser.error='There is no such user!'
                res.render('user/login',reqUser)
              return
            }
            if(!user.authenticate(reqUser.password)){
                reqUser.error='Incorrect password!'
                res.render('user/login',reqUser)
               return
                

            }
            
                req.logIn(user,(err)=>{
                    if(err){
                        console.log(err);
                        
                    }
                })
                res.redirect('/')
            
         })
         .catch(err=>console.log(err)
         )
        

    }
};