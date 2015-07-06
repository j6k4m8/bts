pointsForGuess = function(guess, actual) {
    var diff = Math.abs(actual - guess),
        points =  50 - (50*(diff / actual)).toFixed(0);

    if (diff.toFixed(2) == 0) { return points + 100; }
    if (diff < 1) { return points + 50; }
    if (diff < 3) { return points + 25; }
    return points < 0 ? 0 : points;
}

SyncedCron.add({
    name: 'Get latest Actual from API',
    schedule: function(parser) {
        // TODO: Exclude holidays
        return parser.text('at 4:01pm every weekday');
    },
    job: function() {
        // TODO: This must be abstracted out into multiple functions

        var lastTrade = YahooFinance.snapshot({symbols:['^GSPC'],fields: ['l1', 'd1']});
        var closingSP = parseFloat(lastTrade['^GSPC'].lastTradePriceOnly);

        if (!Actuals.findOne({
            date: moment(lastTrade['^GSPC'].lastTradeDate).startOf('day').toDate()
        })) {
            Actuals.insert({
                'value': closingSP,
                'date': moment(lastTrade['^GSPC'].lastTradeDate).startOf('day').toDate(),
                'change': (closingSP - lastActual().value) / lastActual().value
            });

            var todaysGuesses = Predictions.find({
                date: {$gt: moment().startOf('day').toDate()}
            }).fetch();

            // Award points to users.
            _(todaysGuesses).each(function(g) {
                var points = pointsForGuess(g.estimate, closingSP);
                Predictions.update(g._id, { $set: {
                    'points': points
                }});

                Meteor.users.update(g.userId, {$set: {
                    'profile.points': points
                }});
            });
        }
    }
});
