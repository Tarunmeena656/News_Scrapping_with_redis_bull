
const { channelProcessor } = require("./channel_processor");
const { feedProcess } = require("./feed_Processor");
const {newsProcessor} = require('./news_processor');

const {NewsQueue,feedQueue,channelQueue} = require('../utils/Queue')


// Queue processes
 channelQueue.process(channelProcessor)
 feedQueue.process(feedProcess)
 NewsQueue.process(2,newsProcessor)


