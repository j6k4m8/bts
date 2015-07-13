Accounts.onCreateUser(function(opts, user) {
    if (opts.profile) {
        user.profile = opts.profile;
    } else {
        user.profile = {
            'points': 0
        };
    };
    if (user.services && user.services.facebook) {
        user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }

    return user;
});

ServiceConfiguration.configurations.upsert(
    { service: "facebook" }, {
        $set: {
            "appId": "863237960396529",
            "loginStyle": 'popup',
            "secret": Meteor.settings.facebook_secret
        }
    });

ServiceConfiguration.configurations.upsert(
    { service: "twitter" }, {
        $set: {
            "consumerKey": "PReNssm6G85ee8TyV2vFHlFaQ",
            "loginStyle": 'popup',
            "secret": Meteor.settings.twitter_secret
        }
    });
