Template.nav.rendered = function() {
    $(".button-collapse").sideNav();
};

Template.nav.created = function() {
    Meteor.call('currentActual', function(err, val) {
        Session.set('currentActual', val);
    });
    Meteor.call('currentChange', function(err, val) {
        Session.set('currentChange', val);
    });
};

Template.nav.helpers({
    currentActual: function() {
        return Session.get('currentActual');
    },
    currentChange: function() {
        return Session.get('currentChange');
    },

    currentStatusColor: function() {
        return Session.get('currentChange') < 0 ? 'red' : 'green';
    },

    currentStatusIcon: function() {
        return Session.get('currentChange') < 0 ? 'trending_down' : 'trending_up';
    }
});

Meteor.setInterval(function() {
    Meteor.call('currentActual', function(err, val) {
        Session.set('currentActual', val);
    });
    Meteor.call('currentChange', function(err, val) {
        Session.set('currentChange', val);
    });
    $('.nav-ticker').fadeOut().fadeIn();
}, 10000);
