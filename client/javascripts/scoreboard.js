Template.scoreboard.helpers({
    'estimates': function() {
        return Predictions.find();
    }
})

Template.scoreboardEstimateHistoryTable_Row.helpers({
    'user': function() {
        return Meteor.users.findOne(this.userId)
    }
})
