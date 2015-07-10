_doNotUse = function() {
    // One-liner to insert an Actual for today with zero change from yesterday
    // (good for starting the server off)
    Actuals.insert({date: moment().startOf('day').toDate(), value: parseFloat(YahooFinance.snapshot({symbols:['^GSPC'],fields: ['l1', 'd1']})['^GSPC'].lastTradePriceOnly), change: 0})
};


currentActual = function() {
    return parseFloat(YahooFinance.snapshot({
        symbols:['^GSPC'],
        fields: ['l1', 'd1']
    })['^GSPC'].lastTradePriceOnly);
};

marketsOpen = function() {
    return moment(YahooFinance.snapshot({
        symbols:['^GSPC'],
        fields: ['l1', 'd1']
    })['^GSPC'].lastTradeDate).startOf('day').toDate()*1 == moment().startOf('day').toDate()*1
}

// lastActual = function() {
//     return Actuals.find({}, {sort: {date: -1}}).fetch()[0];
// }

currentChange = function() {
    var last = lastActual().value;
    return ((currentActual() - last) / last).toFixed(2);
};

Meteor.methods({
    currentActual: currentActual,
    currentChange: currentChange,
    marketsOpen: marketsOpen
});
