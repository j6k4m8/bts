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
    Meteor.call('marketsOpen', function(err, val) {
        Session.set('marketsOpen', val);
    });
};

Template.nav.helpers({
    currentActual: function() {
        return Session.get('currentActual');
    },
    currentChange: function() {
        if (!marketsOpen()) { return 'Markets Closed' }
        return Session.get('currentChange');
    },

    currentStatusColor: function() {
        if (!marketsOpen()) { return 'grey' }
        return Session.get('currentChange') < 0 ? 'red' : 'green';
    },

    currentStatusIcon: function() {
        if (!marketsOpen()) { return 'schedule' }
        return Session.get('currentChange') < 0 ? 'trending_down' : 'trending_up';
    }
});

Template.nav.events({
    'click .logout': function() {
        Meteor.logout(function(er) {
            Router.go('home');
        });
    }
})

Meteor.setInterval(function() {
    Meteor.call('currentActual', function(err, val) {
        Session.set('currentActual', val);
    });
    Meteor.call('currentChange', function(err, val) {
        Session.set('currentChange', val);
    });
    $('.nav-ticker').fadeOut().fadeIn();
}, 10000);
