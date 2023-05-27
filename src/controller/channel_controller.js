const Queue = require('bull');
const ChannelModel = require('../models/channel')



const channelQueue = new Queue("channelQueue", { 
    redis: { host: "127.0.0.1", port: "6379" } 
});



exports.insertChannel = async(req,res) => {
    try{
        const { channel_name , channel_link } = req.body;
        const channelExist = await ChannelModel.find({channel_link});
        if(channelExist == 0){
             await ChannelModel.create({ channel_name , channel_link})
             res.json({ message : "Successfully" })
        }

    }
    catch(err){
        console.log(err)
    }
}


exports.addChannelIntoQueue = async(req,res) => {
 try{
    const channels = await ChannelModel.find();
  
    for(const channel of channels){
        await channelQueue.add({channel})
    }
    res.json('Added channel ')
    
 }

 catch (err) {
    console.log(err);
}

}






