(function(context) {
    context.Block = function() {
        this.id = 0;
        this.type = 0;
        this.identifier = "";
        this.operator = 0;
        this.blocks = [];
    };

    context.Block.prototype.toString = function() {
        return "Block #" + this.id;
    };
})(window.Pupil);