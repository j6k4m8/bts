Router.configure({
    layoutTemplate: 'main'
});



Router.map(function() {

    this.route('home', {
        path: '/',
        template: 'home'
    });

    this.route('login', {
        path: '/login',
        template: 'login'
    });

    this.route('profile', {
        path: '/users/:userId',
        template: 'profile_page',
        data: function() {
            return {
                user: Meteor.users.findOne(this.params.userId)
            }
        }
    });

    this.route('scoreboard', {
        path: '/scoreboard',
        template: 'scoreboard'
    });
});

