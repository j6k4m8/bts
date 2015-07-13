Template.scoreboard.helpers({
    'users': function() {
        return Meteor.users.find();
    }
})

Template.scoreboard_row.helpers({
    'user': function() {
        return Meteor.users.findOne(this.userId)
    },
    user_points: function() {
        return this.profile.points;
    },
})
