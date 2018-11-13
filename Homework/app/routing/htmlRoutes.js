const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


// This is the opening page, home page. 
router.get('/', (req, res) => {
    fs.readFile('./app/data/public/home.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('Something is wrong, please try again.');
        }
        res.send(data);
    });
});

//This displays the survey page. 
//This response pulls the name and image from Friends.js that goes into the modal. 
router.get('/survey', (req, res) => {
        res.render('survey', {matchName: '', src: ''});
});

//This displays the home page as default Same as above. 
router.get('*', (req, res) => {
    fs.readFile('./app/data/public/home.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('Something is wrong, please try again.');
        }
        res.send(data);
    });
});


module.exports = router;