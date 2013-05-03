(function(context) {
    context.TokenFactory = function(Token) {
        this.Token = Token;
        this.currentId = 1;
    };

    context.TokenFactory.prototype.getInstance = function() {
        var token = new this.Token();
        token.id = this.currentId++;

        return token;
    };

    context.TokenFactory.prototype.getValueInstance = function() {
        var token = this.getInstance();
        token.type = 1;

        return token;
    };

    context.TokenFactory.prototype.getOperatorInstance = function() {
        var token = this.getInstance();
        token.type = 2;

        return token;
    };

    context.TokenFactory.prototype.getSubTokenInstance = function() {
        var token = this.getInstance();
        token.type = 3;

        return token;
    };
})(window.Pupil);