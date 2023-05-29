const { Router } = require('express');
const indexRouter = Router();
const schedule = require('node-schedule')
const ChannelController = require('../controller/channel_controller');
const arenaConfig = require('../utils/bull_arena');


// const job = schedule.scheduleJob(" * 5 * * * * " , function(){
//     console.log()
// })

//route for insert a channel in database
indexRouter.post('/insertChannel' ,ChannelController.insertChannel );

//route for start a scrapping

indexRouter.get('/start' , ChannelController.addChannelIntoQueue)



indexRouter.get('/' , arenaConfig)




module.exports = indexRouter;