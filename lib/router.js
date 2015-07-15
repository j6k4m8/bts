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
    this.route('register', {
        path: '/register',
        template: 'register'
    });
    this.route('about', {
        path: '/about',
        template: 'about'
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

    this.route('terms', {
        path: '/terms',
        template: 'terms'
    });


    this.route('admin', {
        path: '/admin',
        template: 'admin'
    });
});

