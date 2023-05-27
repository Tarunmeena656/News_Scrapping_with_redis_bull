var validUrl = require("valid-url");
const cheerio = require("cheerio");
const { Selector } = require("./Selector");
const axios = require("axios");
const FeedModel = require("../models/feed");

const createAllElementList = async (channel) => {
  try {
    const { channel_name, channel_link } = channel;
    const response = await axios.get(channel_link);
    const $ = cheerio.load(response.data);
    let Element;

    const channelname = channel_name.toLowerCase().replaceAll(" ", "");

    if (channelname in Selector) {
      Element = $(Selector[channelname]['feedSelector']).toArray();
    }
    return { Element, $, channelname };
  } catch (err) {
    console.log(err);
  }
};



exports.getAllFeedsFromElemets = async (channel) => {
  try {
    const { channel_link, _id } = channel;
    const { Element, $, channelname } = await createAllElementList(channel);

    const feedRss = [];
    Element.forEach((e) => {
      const { getfeedData } = Selector[channelname];
      let { category_link, category_name } = getfeedData(e, $);

      if (!validUrl.isUri(category_link)) {
        const url = new URL(channel_link);
        category_link = url.origin.concat(category_link);
      }
      feedRss.push({
        category_name,
        category_link,
        channelName: channelname,
        channelId: _id,
      });
    });

    const oldFeedData = await FeedModel.find();
    const oldRssLink = [];
    for (const link of oldFeedData) {
      const { category_link } = link;
      oldRssLink.push(category_link);
    }

    if (oldFeedData.length != 0) {
      for (const data of feedRss) {
        const { category_link } = data;
        if (!oldRssLink.includes(category_link)) {
          await FeedModel.create(data);
        }
      }
    } else {
      for (const data of feedRss) {
        await FeedModel.create(data);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
