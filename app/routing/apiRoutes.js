const express = require('express');
const router = express.Router();
const fs = require('fs');

let friends = require('../data/friends');

//Pulls the array to be shown in the array api web page. 
router.get('/friends', (req, res) => {
    fs.readFile('./app/data/friends.js', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.send('Something went wrong, please try again');
        }

        res.send('<code>' + JSON.stringify(friends, undefined, 2) + '</code>');
    })
});

//Posts newFriend into the array. 
router.post('/', (req, res) => {

    req = req.body;
    const newFriend = {
        name: req.name,
        image: req.image,
        answers: []
    };

    for(answer in req.q){
        newFriend.answers.push(req.q[answer]);
    }

    const match = findMatch(newFriend, friends);
    addToFriends(newFriend, friends);

    res.jsonp(JSON.stringify(match));

});

//Writes new object in Friends.js array. The actual js file is being rewritten. 
function addToFriends(newFriend, friends){
    friends.push(newFriend);

    const data = 'var friends = ' + JSON.stringify(friends, null, 2) + '\n module.exports = friends'

    fs.writeFile('./app/data/friends.js', data, err =>{
        if(err){
            console.log(err);
        }
    })
}

//This is the math. Figures out which friend in the array is closest to new survey entry. 
function findMatch(newFriend, friends){
    let scoreComparison = 100;
    let closestMatch;

    friends.forEach(friend =>{
        let currentScore = 0;
        for(let i = 0; i < friend.answers.length; i++){
            currentScore += (Math.abs(parseInt(friend.answers[i]) - parseInt(newFriend.answers[i])));
        }
        console.log('Current Score: ' + currentScore);
        if(currentScore < scoreComparison){
            scoreComparison = currentScore;
            closestMatch = friend;
        }
    })

    return closestMatch;
}




module.exports = router;