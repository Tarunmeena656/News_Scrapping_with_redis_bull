const Queue = require("bull");
const path = require("path");
const { Redis_host, Redis_port } = require("../config/constant");

const QueueConfig = {
    redis: { host: Redis_host, port: Redis_port }
}
const channelQueue = new Queue("channelQueue", QueueConfig);


const feedQueue = new Queue("feedQueue", QueueConfig);

const NewsQueue = new Queue("NewsQueue", QueueConfig);






module.exports = { NewsQueue, feedQueue, channelQueue }