exports.Selector = {
    indiatoday: {
        feedSelector: '.links li',
        newsSelector: '.description p,.PhotoCard_card__details__3Le4m p',
        getfeedData: (e, $) => {
            let category_link = $(e).find("a").attr("href");
            let category_name = $(e).find("a").text();
            return { category_link, category_name }
        },
        getNewsContent: async function (page) {
            const textContent = await page.evaluate(function (selector) {
                return document.querySelector(selector)?.textContent
            }, this.newsSelector)
            return textContent;
        }

    },


    ndtvindia: {
        feedSelector: ".rss_link li",
        newsSelector: ".ins_storybody p",
        getfeedData: (e, $) => {
            let category_link = $(e).find("a").attr("href");
            let category_name = $(e).find("a").text();
            return { category_link, category_name }
        },
        getNewsContent: async function (page) {
            const textContent = await page.evaluate(function (selector) {
                return document.querySelector(selector)?.textContent
            }, this.newsSelector)
            return textContent;
        }

    },

    abpnews: {
        feedSelector: '.rsstablerow',
        newsSelector: '.uk-text-break p , .video_content p',
        getfeedData: (e, $) => {
            const category_link = $(e).find("td > a").attr("href");
            const category_name = $(e).find('td').eq(0).text();
            return { category_name, category_link }
        },
        getNewsContent: async function (page) {
            const textContent = await page.evaluate(function (selector) {
                return document.querySelector(selector)?.textContent
            }, this.newsSelector)
            return textContent;
        }


    }

}