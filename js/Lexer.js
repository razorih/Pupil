(function(context) {
    context.Lexer = function() {
        this.TOKEN_TYPE_SUB_OPEN = 1;   // (
        this.TOKEN_TYPE_SUB_CLOSE = 2;  // )
        this.TOKEN_TYPE_OPERATOR = 3;   // && and ||
        this.TOKEN_TYPE_IDENTIFIER = 4; // Any string
    };

    /**
     * Analyzes the given string and returns a set of pre-tokens
     * that should next be evaluated by the evaluate method.
     *
     * @param   {String}  inputString  The input string
     *
     * @return  {Array}                An array of pre-tokens
     */
    context.Lexer.prototype.analyze = function(inputString) {
        var tokens = [];
        var cleanedString = inputString.trim();

        // Temporary storage for the identifier name
        var tempIdentifier = "";

        // If we should dump our currently constructed identifier
        var shouldDumpIdentifier = false;

        // What to dump after finding out what to dump
        var tempToDump = [];

        for (var i = 0; i < cleanedString.length; i++) {
            var symbol = cleanedString[i];
            var nextSymbol = null;

            if (i + 1 < cleanedString.length) {
                nextSymbol = cleanedString[i + 1];
            }

            // Open a sub-block
            if (symbol == "(") {
                shouldDumpIdentifier = true;
                tempToDump = [this.TOKEN_TYPE_SUB_OPEN];
            }

            // Close a sub-block
            else if (symbol == ")") {
                shouldDumpIdentifier = true;
                tempToDump = [this.TOKEN_TYPE_SUB_CLOSE];
            }

            // An OR operator
            else if (symbol == "|" && nextSymbol == "|") {
                shouldDumpIdentifier = true;
                tempToDump = [this.TOKEN_TYPE_OPERATOR, 1];
            }

            // An AND operator
            else if (symbol == "&" && nextSymbol == "&") {
                shouldDumpIdentifier = true;
                tempToDump = [this.TOKEN_TYPE_OPERATOR, 2];
            }

            // An identifier
            else {
                tempIdentifier++;
            }

            if (shouldDumpIdentifier) {
                if (tempIdentifier !== "") {
                    tokens.push([this.TOKEN_TYPE_IDENTIFIER, tempIdentifier]);
                    tempIdentifier = "";
                }

                shouldDumpIdentifier = false;
            }

            if (tempToDump) {
                tokens.push(tempToDump);
            }
        }

        // Make sure we don't have any identifiers lingering around
        if (tempIdentifier !== "") {
            tokens.push([this.TOKEN_TYPE_IDENTIFIER, tempIdentifier]);
            tempIdentifier = "";
        }

        return tokens;
    };
})(window.Pupil);