const friends = require("../data/friends.js");

console.log(friends);


function findMatch(friends, newFriend){
    let scoreComparison = 100;
    let closestMatch;

    friends.forEach(friend =>{
        let currentScore = 0;
        for (let i = 0; i < friend.scores.length; i++) {
                        
        }
    });
}

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        friends.push(req.body);
        // console.log(res.json(friends));
    });
};

