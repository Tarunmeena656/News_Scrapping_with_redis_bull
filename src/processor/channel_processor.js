const FeedModel = require('../models/feed')
const { getAllFeedsFromElemets } = require("../utils/getFeed");
const { feedQueue } = require('../utils/Queue')




exports.channelProcessor = async (job, done) => {
    try {
        const { channel } = job.data;

       
        await getAllFeedsFromElemets(channel)
       
        const allCategory = await FeedModel.find();

       

        for(const category of allCategory){
            await feedQueue.add(category)
        }


        done();
    } catch (err) {
        console.log(err);
    }
}

