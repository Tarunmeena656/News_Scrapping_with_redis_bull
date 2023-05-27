const { Router } = require('express');
const indexRouter = Router();
const ChannelController = require('../controller/channel_controller')


//route for insert a channel in database
indexRouter.post('/insertChannel' ,ChannelController.insertChannel );

//route for start a scrapping
indexRouter.get('/start' , ChannelController.addChannelIntoQueue)



module.exports = indexRouter;