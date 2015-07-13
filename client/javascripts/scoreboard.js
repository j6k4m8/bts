Template.scoreboard.helpers({
    'users': function() {
        var users = Meteor.users.find().fetch();
        return _(users).sortBy(function(i) {
            return -1 * i.profile.points;
        });
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
