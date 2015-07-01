Template.user_home.events({
    'change #estimate_input, input #estimate_input, paste #estimate_input, keyup #estimate_input, mouseup #estimate_input': function(ev) {
        var $el = $(ev.target),
            val = parseFloat(ev.target.value);
        if (val < 0) { $el.removeClass('green-text').addClass('red-text')}
        else if (val > 0) { $el.removeClass('red-text').addClass('green-text')}
        else { $el.removeClass('red-text green-text')}
    },

    'click .submit-estimate': function() {
        var val = parseFloat($('#estimate_input').val());
        if (val) {
            Meteor.call('castEstimate', val, function(err, val) {
                if (err) { Materialize.toast(err, 3000); }
            });
        }
    }
});
