(function(context) {
    context.Parser = function(Lexer, BlockFactory) {
        this.Lexer = Lexer;
        this.BlockFactory = BlockFactory;
    };

    context.Parser.prototype.parse = function(inputString) {
        var tokens = this.Lexer.tokenize(inputString);
        var blocks = this.tokensToBlocks(tokens);
    };

    context.Lexer.prototype.openSubBlock = function(currentToken) {
        var newToken = this.BlockFactory.getSubTokenInstance();
        currentToken.tokens.push(newToken);

        return newToken;
    };

    context.Parser.prototype.tokensToBlocks = function(tokens) {
        var self = this;

        var rootBlock = this.BlockFactory.getSubTokenInstance();
        var currentBlock = rootBlock;

        var blockNest = [];
        var temp = null;

        // Go through each symbol in the string
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];

            if (token[0] == this.Lexer.TOKEN_TYPE_SUB_OPEN) {
                currentBlock = this.openSubBlock();
            }

            else if (token[0] == this.Lexer.TOKEN_TYPE_SUB_CLOSE) {
                if (blockNest.length > 0) {
                    currentBlock = blockNest.pop();
                } else {
                    throw "No token to ascend to!";
                }
            }

            else if (token[0] == this.Lexer.TOKEN_TYPE_OPERATOR) {
                temp = this.BlockFactory.getOperatorInstance();
                temp.operator = token[1];

                currentBlock.tokens.push(temp);
            }

            else if (token[0] == this.Lexer.TOKEN_TYPE_IDENTIFIER) {
                temp = this.BlockFactory.getIdentifierInstance();
                temp.identifier = token[1];

                currentBlock.tokens.push(temp);
            }
        }

        if (blockNest.length > 0) {
            throw "Unclosed tokens!";
        }

        return rootBlock;
    };
})(window.Pupil);