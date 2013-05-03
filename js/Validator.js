(function(context) {
    context.Validator = function(Parser) {
        if (typeof Parser !== "undefined") {
            this.Parser = Parser;
        } else {
            var Lexer = new context.Lexer();
            var BlockFactory = new context.BlockFactory(context.Block);

            this.Parser = new context.Parser(Lexer, BlockFactory);
        }

        this.validationFunctions = {};
    };

    context.Validator.prototype.addFunction = function(name, func) {
        this.validationFunctions[name] = func;
    };

    context.Validator.prototype.validate = function(rules) {
        var results = [];

        for (var key in rules) {
            var value = rules[key][0];
            var rootBlock = this.Parser.parse(rules[key][1]);

            results[key] = this.validateBlock(value, rootBlock);
        }

        return results;
    };

    context.Validator.prototype.validateBlock = function(value, block) {
        var previousBoolean = false;
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

                var fullParameters = [value].concat(parameters);
                var functionResult = this.validationFunctions[funcName].apply(this, fullParameters);

                // With OR, the result will be true if the new result is true
                if (previousOperator == 1 && functionResult) {
                    previousBoolean = true;

                // With AND, both the previous result (previousBoolean) and the current one have to be true for this to be true
                } else if (previousOperator == 2) {
                    if (previousBoolean && functionResult) {
                        previousBoolean = true;
                    } else {
                        previousBoolean = false;
                    }
                }
            }

            // Operator
            else if (currentBlock.type == 2) {
                previousOperator = currentBlock.operator;
            }

            // Sub-block
            else if (currentBlock.type == 3) {
                var blockResult = this.validateBlock(value, currentBlock);

                // With OR, the result will be true if the new result is true
                if (previousOperator == 1 && blockResult) {
                    previousBoolean = true;

                // With AND, both the previous result (previousBoolean) and the current one have to be true for this to be true
                } else if (previousOperator == 2) {
                    if (previousBoolean && blockResult) {
                        previousBoolean = true;
                    } else {
                        previousBoolean = false;
                    }
                }
            }
        }

        return previousBoolean;
    };
})(window.Pupil);