exports.ndtvindia = {
        feedSelector: ".rss_list li",
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

    }
