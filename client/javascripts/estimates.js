Template.userEstimateHistoryTable.helpers({
    'userEstimates': function() {
        return Predictions.find({
            'userId': this.user._id
        });
    }
});


Template.userEstimateHistoryTable_Row.helpers({
    date_to_string: function() {
        return moment(this.date).calendar();
    },

    actual: function() {
        return Actuals.findOne({
            date: moment(this.date).startOf('day').toDate()
        }).value;
    }
});
