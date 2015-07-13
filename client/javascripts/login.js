tryLogin = function() {
    var un = $('#login_un').val(),
        pw = $('#login_pw').val();

    if (!un || !pw) { Materialize.toast("Invalid login!", 1000); }
    else {
        Meteor.loginWithPassword(un, pw, function(er) {
            if (!er) {
                Router.go('profile', {username: un});
            } else {
                Materialize.toast('Invalid login!', 1000);
            }
        });
    }
};

tryRegister = function() {
    var un = $('#login_un').val(),
        pw = $('#login_pw').val(),
        nm = $('#login_nm').val(),
        em = $('#login_em').val();

    if (!un || !pw || !em || !nm) { Materialize.toast("All fields are required!", 5000); }
    else {
        Accounts.createUser({
            username: un,
            password: pw,
            email: em,
            profile: {
                name: name
            }
        }, function(er) {
            if (!er) {
                Router.go('home');
            } else {
                Materialize.toast('Invalid registration!', 1000);
            }
        });
    }
};

Template.login.events({
    'click .submit-login': tryLogin,

    'click .fb-login-btn': function() {
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email', 'user_friends'],
            loginStyle: 'popup'
        }, function(er) {
            if (!er) {
                Router.go('home');
            } else {
                Materialize.toast('Invalid login: ' + er, 5000);
            }
        });
    },

    'click .tw-login-btn': function() {
        Meteor.loginWithTwitter({
            loginStyle: 'popup'
        }, function(er) {
            if (!er) {
                Router.go('home');
            } else {
                Materialize.toast('Invalid login: ' + er, 5000);
            }
        });
    }
});


Template.register.events({
    'click .submit-register': tryRegister,

    'click .fb-login-btn': function() {
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email', 'user_friends'],
            loginStyle: 'popup'
        }, function(er) {
            if (!er) {
                Router.go('home');
            } else {
                Materialize.toast('Invalid login: ' + er, 5000);
            }
        });
    },

    'click .tw-login-btn': function() {
        Meteor.loginWithTwitter({
            loginStyle: 'popup'
        }, function(er) {
            if (!er) {
                Router.go('home');
            } else {
                Materialize.toast('Invalid login: ' + er, 5000);
            }
        });
    }
});
