currentUserMayCastEstimate = function() {
    return !Predictions.findOne({
        date: { $gt: moment().startOf('day').toDate() },
        userId: Meteor.userId()
    }) && marketsOpen();
};

marketsOpen = function() {
    return Session.get('marketsOpen') || false;
};

lastActual = function() {
    return Actuals.find({}, {
        sort: {date: -1}
    }).fetch()[0];
};


UI.registerHelper('title', function(title) {
    document.title = title ? title + " | Bpstreet" : "Bpstreet";
});

UI.registerHelper('currentUserMayCastEstimate', currentUserMayCastEstimate);

UI.registerHelper('percent', function(num) {
    if (typeof num == Number)
        return num + "%";
    return num;
});

predictableMarketDay = function() {
    // If markets are open, pick tomorrow (or monday).
    if (marketsOpen()) {
        if (moment().weekday() < 5) {
            // If Sunday through Thursday, return tomorrow morning.
            return moment().add(1, 'd').startOf('day').toDate();
        } else {
            // If Friday or Saturday, return next Monday morning.
            return moment().add(1, 'w').startOf('week').add(1, 'd').startOf('day').toDate();
        }
    } else {
        if (!!~_.range(1, 5).indexOf(moment().weekday())) {
            // If today is a weekday:
            if ((moment().hours() == 9 && moment().minutes() < 31) || moment().hours() < 9) {
                return moment().startOf('day').toDate();
            } else {
                return moment().add(1, 'd').startOf('day').toDate();
            }
        } else {
            if (moment().weekday() == 0) {
                return moment().add(1, 'd').startOf('day').toDate();
            } else {
                return moment().add(1, 'w').startOf('week').add(1, 'd').startOf('day').toDate();
            }
        }
    }
}

UI.registerHelper('predictableMarketDay', function() {
    return predictableMarketDay();
});


UI.registerHelper('calendar', function(cal) {
    return moment(cal).format('l');
});

UI.registerHelper('nameFor', function(user) {
    return user.name || user.profile.name || user.username;
});
