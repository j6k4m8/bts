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
    }
});
