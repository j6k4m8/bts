Accounts.onCreateUser(function(opts, user) {
    if (opts.profile) {
        user.profile = opts.profile;
    } else {
        user.profile = {
            'points': 0
        };
    };

    return user;
})
