const express = require('express');
const path = require('path');
const cheerio = require('cheerio');
const request = require('request');
const puppeteer = require('puppeteer');

var router = express.Router();

router.get('/:context', (req, res) => {
    async function main() {
        var context = req.params.context;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://docs.erpnext.com/docs/user/manual/en', {waitUntil: 'networkidle2'});
        await page.$eval('input[class="form-control"]', (el, context) => el.value = context, context);
        await (await page.$('input[class="form-control"]')).click();
        await page.waitForSelector('.dropdown-item');

        const initContent = await page.content();
        $ = cheerio.load(initContent);
        $('.doc-search-container').appendTo('body');
        $('body').children(':not(.doc-search-container)').remove();

        var targetContext = $('.dropdown-menu').children('.dropdown-item').first().attr('href');
        var targetUrl = 'https://docs.erpnext.com' + targetContext;
        browser.close();

        request({
            method: 'GET',
            url: targetUrl,
        }, (err, resp, body) => {
            $ = cheerio.load(body);
            $('main').appendTo('body');
            $('body').children(':not(main)').remove();

            res.send($('body').html());
        })
    }
    main();
});

module.exports = router;