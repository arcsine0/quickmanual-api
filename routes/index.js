const express = require('express');
const path = require('path');
const rp = require('request-promise');

var router = express.Router();

router.get('/:context', (req, res) => {
    var context = req.params.context;
    var url = 'https://docs.erpnext.com/docs/user/manual/en/' + context;

    rp(url)
    .then(html => {
        res.send(html);
    })
    .catch(err => {
        console.log('err!');
    });
});

module.exports = router;