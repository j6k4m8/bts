Template.profile.helpers({
    user_points: function() {
        return this.user.profile.points;
    },
    user_error: function() {
        var ps = Predictions.find({
            userId: this.user._id
        }).fetch();

        var error = 0, iter = 0;
        _(ps).each(function(i) {
            var correlate = Actuals.findOne({
                date: moment(i.date).startOf('day').toDate()
            });
            if (correlate) {
                error = error*iter + (i.estimate - correlate.change);
                error /= ++iter;
            }
        });
        return error.toFixed(2);
    },

    is_my_profile: function() {
        return this.user._id == Meteor.userId();
    },

    nameForUser: function() {
        return this.user.name || this.user.profile.name || this.user.username;
    }
});

UI.registerHelper('getImageForUser', function(user) {
    return user.profile.picture;
});

UI.registerHelper('socialLinkForUser', function(user) {
    if (user.services.facebook) {
        return "<a href='https://facebook.com/" + user.services.facebook.id + "'>" + user.profile.name || user.username + "</a>";
    }
    if (user.services.twitter) {
        return "a href='https://twitter.com/" + user.services.twitter.screenName + "'>" + user.profile.name || user.username + "</a>";
    }
    return "http://bpstreet.com/users/" + user._id
});


Template.profile_picture.helpers({
    'radius': function() {
        if (this.circle) {
            return 'border-radius: 50%;vertical-align: text-bottom;'
        }
    }
})
