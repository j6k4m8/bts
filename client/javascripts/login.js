tryLogin = function() {
    var un = $('#login_un').val(),
        pw = $('#login_pw').val();

    if (!un || !pw) { Materialize.toast("Invalid login!", 1000); }
    else {
        Meteor.loginWithPassword(un, pw, function(er) {
            if (!er) {
                Router.go('home');
            } else {
                Materialize.toast('Invalid login!', 1000);
            }
        });
    }
};

Template.login.events({
    'click .submit-login': tryLogin()
});
