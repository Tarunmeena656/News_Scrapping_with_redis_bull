const { parse } = require("rss-to-json");
const NewsModel = require("../models/feedNews");
const {NewsQueue} = require('../utils/Queue')



exports.feedProcess = async (job, done) => {
    try {
        const { category_link, _id, category_name, channelId , channelName } = job.data;

        const rss = await parse(category_link);

        const newsLinks = await NewsModel.find({}, "link -_id");
        const waitingLinks = await NewsQueue.getActive();
        const activeLinks = await NewsQueue.getWaiting();

        let linkArray = newsLinks.map((data) => data.link);

        linkArray = linkArray.concat(
            [...waitingLinks, ...activeLinks].map((item) => item.data.link)
        );

        for (let item of rss.items) {
            if (!linkArray.includes(item.link)) {
                await NewsQueue.add({
                    ...item,
                    feedId: _id,
                    channelName,
                    channelId,
                });
            }
        }

        
        done();
    } catch (err) {
        console.log(err);
    }
};
