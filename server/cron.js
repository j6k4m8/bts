pointsForGuess = function(guess, actual) {
    diff = Math.abs(actual - guess),
        fx = ((diff / Math.max(actual, diff)));
    points = parseInt(50 - (fx * 50));
    if (diff.toFixed(2) == 0) { return points + 100; }
    if (diff < 1) { return points + 50; }
    if (diff < 3) { return points + 25; }
    return points < 0 ? 0 : points;
}


runScores = function(momentTodayMorning, forceRun) {
    momentTodayMorning = moment(momentTodayMorning).startOf('day');
    var lastTrade = YahooFinance.snapshot({symbols:['^GSPC'],fields: ['l1', 'd1']});
    var closingSP = parseFloat(lastTrade[0].lastTradePriceOnly);

    if (forceRun || !Actuals.findOne({
        date: momentTodayMorning.startOf('day').toDate()
    })) {
        var aId = Actuals.insert({
            'value': closingSP,
            'date': momentTodayMorning.startOf('day').toDate(),
            'change': 100 * (closingSP - lastActual().value) / lastActual().value
        });
        var a = Actuals.findOne(aId);

/*
        var ps = Predictions.find({
            'points': undefined
        }).fetch();

        _(ps).each(function(p) {
            var dayActual = Actuals.findOne({'date': p.date});
            Predictions.update(p._id, {$set: {'points': pointsForGuess(p.estimate, a.change) })
        });
*/
        var todaysGuesses = Predictions.find({
            date: {$gte: momentTodayMorning.startOf('day').toDate()}
        }).fetch();

        // Award points to users.
        _(todaysGuesses).each(function(g) {
            var points = pointsForGuess(g.estimate, a.change);
            console.log(points + " for " + g.userId);
            Predictions.update(g._id, { $set: {
                'points': points
            }});

            Meteor.users.update(g.userId, {$inc: {
                'profile.points': points
            }});
        });
    }
};

SyncedCron.add({
    name: 'Get latest Actual from API',
    schedule: function(parser) {
        // TODO: Exclude holidays
        return parser.text('at 4:01pm every weekday');
    },
    job: function() {
        runScores(moment().startOf('day'));
    }
});


SyncedCron.start();
