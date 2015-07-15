Template.admin.helpers({
    is_admin: function() {
        return Meteor.user().profile.is_admin == true;
    }
});

Template.admin.events({
    'click .js-csv-predictions': function() {
        var nameFile = 'Predictions.csv';
        Meteor.call('downloadPredictions', function(err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        });
    },

    'click .js-csv-actuals': function() {
        var nameFile = 'Actuals.csv';
        Meteor.call('downloadActuals', function(err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        });
    }
});
