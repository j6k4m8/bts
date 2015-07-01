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
        }
    }
});
