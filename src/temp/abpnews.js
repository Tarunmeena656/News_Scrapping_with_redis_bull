exports.abpnews = {
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
