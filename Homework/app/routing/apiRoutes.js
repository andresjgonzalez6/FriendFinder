const friends = require("../data/friends.js");
const fs = require("fs");

console.log(friends);

function addToFriends(newFriend, friends) {
    friends.push(newFriend);

    const data = 'var friends = ' + JSON.stringify(friends, null, 2) + '\n module.exports = friends'

    fs.writeFile('./app/data/friends.js', data, err => {
        if (err) {
            console.log(err);
        }
    })
}

function findMatch(friends, newFriend) {
    let scoreComparison = 100;
    let closestMatch;

    friends.forEach(friend => {
        let currentScore = 0;
        for (let i = 0; i < friend.scores.length; i++) {
            currentScore += (Math.abs(parseInt(friend.scores[i]) - parseInt(newFriend.answers[i])));
        }

        console.log("Current Score: " + currentScore);
        if (currentScore < scoreComparison) {
            scoreComparison = currentScore;
            closestMatch = friend;
        }

        return closestMatch;
    });
}

module.exports = function (app) {
    app.get('/friends', (req, res) => {
        fs.readFile('./app/data/friends.js', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.send('Someting went wrong, please try again');
            }

            res.send('<code>' + JSON.stringify(friends, undefined, 2) + '</code>');
        })
    });

    app.post('/', (req, res) => {

        req = req.body;
        const newFriend = {
            name: req.name,
            pic: req.pic,
            answers: []
        };

        for (answer in req.q) {
            newFriend.answers.push(req.q[answer]);
        }

        const match = findMatch(newFriend, friends);
        addToFriends(newFriend, friends);

        res.jsonp(JSON.stringify(match));

    });
};

