(function(context) {
    context.Validator.prototype.addDefaultFunctions = function() {
        this.addFunction("required", function(value) {
            if (typeof value === "undefined" || value === "" || value === null) {
                return false;
            }

            return true;
        });

        this.addFunction("min", function(value, min) {
            // If it's a number
            if ( ! isNaN(parseFloat(value)) && isFinite(value)) {
                return value >= min;

            // If it's a string (or "not a number")
            } else {
                return value.length >= min;
            }
        });

        this.addFunction("max", function(value, max) {
            // If it's a number
            if ( ! isNaN(parseFloat(value)) && isFinite(value)) {
                return value <= max;

            // If it's a string (or "not a number")
            } else {
                return value.length <= max;
            }
        });

        this.addFunction("between", function(value, min, max) {
            // If it's a number
            if ( ! isNaN(parseFloat(value)) && isFinite(value)) {
                return (value >= min && value <= max);

            // If it's a string (or "not a number")
            } else {
                return (value.length >= min && value.length <= max);
            }
        });
    };
})(window.Pupil);