currentUserMayCastEstimate = function() {
    return !Predictions.findOne({
        date: { $gt: moment().startOf('day').toDate() },
        userId: Meteor.userId()
    }) && marketsOpen();
};

marketsOpen = function() {
    // TODO
    return true;
};

lastActual = function() {
    return Actuals.find({}, {
        sort: {date: -1}
    }).fetch()[0];
};


Handlebars.registerHelper('currentUserMayCastEstimate', currentUserMayCastEstimate);

Handlebars.registerHelper('percent', function(num) {
    return num + "%";
});
