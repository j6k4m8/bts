SyncedCron.add({
    name: 'Get latest Actual from API',
    schedule: function(parser) {
        // TODO: Exclude holidays
        return parser.text('at 4:01pm every weekday');
    },
    job: function() {
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

            // Now, we can go through all of the user accounts and award points if
            // someone hit the nail on the head. Meanwhile, we'll keep track of
            // whoever's the closest, since we'll later award them some points if
            // no one got better.

            var closestGuess = 9999,
                closestUserIds = [];

            var todaysGuesses = Predictions.find({
                date: {$gt: moment().startOf('day').toDate()}
            }).fetch();

            var usersCorrect = [];

            _(todaysGuesses).each(function(g) {
                if (g.estimate.toFixed(2) == closingSP.toFixed(2)) {
                    usersCorrect.push(g.userId);
                } else if (usersCorrect.length == 0 &&
                           Math.abs(g.estimate - closingSP) <= closestGuess) {
                    closestGuess = Math.abs(g.estimate - closingSP);
                    closestUserIds.push(g.userId);
                }
            });

            if (usersCorrect.length > 0) {
                Meteor.users.update({
                    _id: {$in: usersCorrect}
                }, {
                    $set: {$inc: {'profile.points': 100}}
                });
            } else {
                Meteor.users.update({
                    _id: {$in: closestUserIds}
                }, {
                    $set: {$inc: {'profile.points': 50}}
                });
            }
        }
    }
});
