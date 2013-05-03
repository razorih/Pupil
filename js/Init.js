(function(context) {
    if ( ! String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    context.Pupil = {};
})(window);