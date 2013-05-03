(function(context) {
    context.Validator = function(Parser) {
        if (typeof Parser !== "undefined") {
            this.Parser = Parser;
        } else {
            var Lexer = new context.Lexer();
            this.Parser = new context.Parser(Lexer);
        }

        this.validationFunctions = {};
    };

    context.Validator.addFunction = function(name, func) {
        this.validationFunctions[name] = func;
    };

    context.Validator.validate = function(inputString) {
        var blocks = this.Parser.parse(inputString);

        var validationResult = this.validateBlock(blocks);
        return validationResult;
    };

    context.Validator.validateBlock = function(block) {
        var previousBoolean = true;
        var previousOperator = 1;

        for (var i = 0; i < block.blocks.length; i++) {
            var currentBlock = block.blocks[i];

            // Function (identifier)
            if (currentBlock.type == 1) {
                var funcName = '';
                var parameters = [];

                var parts = currentBlock.identifier.split(":");
                funcName = parts[0];

                if (parts.length >= 2) {
                    parameters = parts[1].split(",");
                }

                var functionResult = this.validationFunctions[funcName].apply(this, parameters);

                // With OR, the result will be true if the new result is true
                if (previousOperator == 1 && functionResult) {
                    previousBoolean = true;

                // With AND, both the previous result (previousBoolean) and the current one have to be true for this to be true
                } else if (previousOperator == 2 && previousBoolean && functionResult) {
                    previousBoolean = true;
                }
            }

            // Operator
            else if (currentBlock.type == 2) {
                previousOperator = currentBlock.operator;
            }

            // Sub-block
            else if (currentBlock.type == 3) {
                var blockResult = this.validateBlock(currentBlock);

                // With OR, the result will be true if the new result is true
                if (previousOperator == 1 && blockResult) {
                    previousBoolean = true;

                // With AND, both the previous result (previousBoolean) and the current one have to be true for this to be true
                } else if (previousOperator == 2 && previousBoolean && blockResult) {
                    previousBoolean = true;
                }
            }
        }

        return previousBoolean;
    };
})(window.Pupil);