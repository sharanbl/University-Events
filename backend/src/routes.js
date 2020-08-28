const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const uploadConfig = require('./config/upload');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res) => {   //To check if the api call is working
    res.send({status: 200});
});


//Dashboard
routes.get('/dashboard', DashboardController.getAllEvents);
routes.get('/dashboard/:eventType', DashboardController.getAllEvents);
routes.get('/events/:eventId', DashboardController.getEventById);


//Registration
routes.post('/registration/:eventId', RegistrationController.create);
routes.get('/registration/:registration_id', RegistrationController.getRegistration);
routes.post('/registration/:registration_id/approvals', ApprovalController.approval);
routes.post('/registration/:registration_id/rejections', RejectionController.rejection);

//Login
routes.post('/login', LoginController.store);

//Events
routes.post('/event', upload.single("thumbnail"), EventController.createEvent);
routes.delete('/event/:eventId', EventController.delete);



//User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;