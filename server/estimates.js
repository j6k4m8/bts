firstEstimate = function(userId) {
    return !Predictions.findOne({
        date: predictableMarketDay(),
        userId: userId
    });
};

Meteor.methods({
    'castEstimate': function(est) {
        if (firstEstimate(this.userId)) {
            Predictions.insert({
                'estimate': est,
                'userId': this.userId,
                'date': predictableMarketDay()
            });
            Meteor.users.update(this.userId, {$set: {
                'profile.points': Meteor.users.findOne(this.userId).profile.points ? Meteor.users.findOne(this.userId).profile.points + 10 : 10
            }});
        } else {
            Predictions.update({
                'userId': this.userId,
                'date': predictableMarketDay(),
            },{
                $set: { estimate: est }
            });
        }
    }
});
