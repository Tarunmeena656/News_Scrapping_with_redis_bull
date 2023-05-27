const puppeteer = require('puppeteer');

exports.Browser = class {
    static instance = null;

    /**
     * 
     * @returns {puppeteer.Browser}
     */
    static async getInstance () {
        if (!this.instance) {
            this.instance = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false });
        }
        return this.instance;
    }
}
