const Car = require('mongoose').model('Car')
const User = require('mongoose').model('User')
const Rent = require('mongoose').model('Rent')



module.exports={
    addGet:(req,res)=>{
        res.render('car/add')
    },
    addPost:(req,res)=>{
        let carBody=req.body

        Car.create({
            model:carBody.model,
            image:carBody.image,
            pricePerDay:carBody.pricePerDay,
            
        }).then(suc=>{
            res.locals.success= 'Successfully added'

            res.redirect('/car/all')

        })
    },
    allCars:(req,res)=>{
        Car.find({}).where('isRented').equals(false).then(cars=>{
            res.render('car/all',{cars})
        })
    },
    rentCarView:(req,res)=>{
        let id=req.params.id
        Car.findById(id)
        .then(car=>{
            res.render('car/rent',car)
        })
        
    },
    rentCarPost:(req,res)=>{
        let id=req.params.id

        Car.findById(id).then(car=>{
            car.isRented=true
            car.save()
            
            Rent.create({
                days:Number(req.body.days),
                car:car._id,
                owner:req.user._id
            }
            ).then(result=>{
            
                res.locals.success='Successfully rented!'
                res.render('home/index')
            })
            
        })
        

    },
    search:(req,res)=>{
        const search=req.body.model
        console.log(search);
        

        Car.find({model:search}).then(cars=>{
            
            
            res.render('car/all',{cars})
        })
    },editCar:(req,res)=>{
        let id=req.params.id
        Car.findById(id)
        .then(car=>{
            res.render('car/edit',car)
        })
        
    },editPostCar:(req,res)=>{
        let id=req.params.id

        Car.findById(id)
        .then(car=>{
            let newCar=req.body
            console.log(newCar);
            car.model=newCar.model
            car.image=newCar.image
            car.pricePerDay=newCar.pricePerDay
            car.save()
            
            
            console.log(car);
            
            res.redirect('/car/all')
        }).catch(err=>console.log(err)
        )
    }
    
}