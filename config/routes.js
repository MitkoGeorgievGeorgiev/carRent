const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user')
const carController = require('../controllers/car')

module.exports = app => {
    app.get('/', homeController.index);
    app.get('/user/register',restrictedPages.isAnonymous,userController.registerGet)
    app.post('/user/register',restrictedPages.isAnonymous,userController.registerPost)
    app.get('/user/login',restrictedPages.isAnonymous,userController.loginGet)
    app.post('/user/login',restrictedPages.isAnonymous,userController.loginPost)
    app.post('/user/logout',userController.logout)
    app.get('/user/rents',restrictedPages.isAuthed,userController.rents)

    app.get('/car/add',restrictedPages.hasRole('Admin'),carController.addGet)
    app.post('/car/add',restrictedPages.hasRole('Admin'),carController.addPost)
    app.get('/car/all',restrictedPages.isAuthed,carController.allCars)
    app.get('/car/rent/:id',restrictedPages.isAuthed,carController.rentCarView)
    app.post('/car/rent/:id',restrictedPages.isAuthed,carController.rentCarPost)
    app.post('/search',carController.search)

    app.get('/car/edit/:id',restrictedPages.hasRole('Admin'),carController.editCar)
    app.post('/car/edit/:id',restrictedPages.hasRole('Admin'),carController.editPostCar)
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};