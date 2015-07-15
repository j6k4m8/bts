Meteor.methods({
    downloadPredictions: function() {
        var collection = Predictions.find().fetch();
        return exportcsv.exportToCSV(collection);
    },


    downloadActuals: function() {
        var collection = Actuals.find().fetch();
        return exportcsv.exportToCSV(collection);
    }
});
