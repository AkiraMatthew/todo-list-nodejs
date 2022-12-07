const express = require('express')

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/index') // o .render serve para devolver as views
});

module.exports = router;