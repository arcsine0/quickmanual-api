const express = require('express');
const path = require('path');
const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');

var router = express.Router();

router.get('/:context', (req, res) => {
    var context = req.params.context;
    var url = 'https://docs.erpnext.com/docs/user/manual/en/' + context;

    var ch_url = {
        uri: url,
        transform: (body) => {
            return cheerio.load(body);
        }
    }

    // rp(ch_url)
    // .then($ => {
    //     $('body').find('main').detach().appendTo('body');
    //     $('body').children(':not(main)').remove();
    //     res.send($.html());
    // })
    // .catch(err => {
    //     console.log('err: ' + err);
    // });

    request({
        method: 'GET',
        url: url,
    }, (err, resp, body) => {
        $ = cheerio.load(body);
        $('main').appendTo('body');
        $('body').children(':not(main)').remove();

        res.send($('body').html());
    })
});

module.exports = router;