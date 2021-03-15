const express = require('express');
const path = require('path');
const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');

var router = express.Router();

router.get('/:context/:contextA', (req, res) => {
    var context = req.params.context;
    var contextA;
    if (req.params.contextA === 'def') { contextA = ''; }
    else { contextA = req.params.contextA; }
    var url = 'https://docs.erpnext.com/docs/user/manual/en/' + context + '/' + contextA;

    var ch_url = {
        uri: url,
        transform: (body) => {
            return cheerio.load(body);
        }
    }

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