mayCastEstimate = function(userId) {
    return !Predictions.findOne({
        date: { $gt: moment().startOf('day').toDate() },
        userId: userId
    }) && marketsOpen();
};

Meteor.methods({
    'castEstimate': function(est) {
        if (mayCastEstimate(this.userId)) {
            Predictions.insert({
                'estimate': est,
                'userId': this.userId,
                'date': new Date()
            });
            Meteor.users.update(this.userId, {$set: {
                'profile.points': Meteor.users.findOne(this.userId).profile.points + 10
            }});
        } else {
            throw new Meteor.Error(500, "You've already cast your estimate for today!");
        }
    }
});
