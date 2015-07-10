Template.userEstimateHistoryTable.helpers({
    'userEstimates': function() {
        return Predictions.find({
            'userId': this.user._id
        });
    }
});


Template.userEstimateHistoryTable_Row.helpers({
    date_to_string: function() {
        return moment(this.date).format('l');
    },

    actual: function() {
        var yesterActual = Actuals.findOne({
            date: moment(this.date).startOf('day').toDate()
        });
        return yesterActual ? yesterActual.change.toFixed(2) + "%" : '';
    }
});
