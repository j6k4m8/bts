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


Handlebars.registerHelper('currentUserMayCastEstimate', currentUserMayCastEstimate);
