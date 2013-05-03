<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>

    <style type="text/css">
        body {
            font: normal 62.5%/1.4 'Verdana', sans-serif;
            background-color: #f8f8f8;
            color: #444;
        }
        p {
            font-size: 1.4em;
        }
        .result-true, .result-false {
            font-weight: bold;
        }
        .result-true {
            color: #76b900;
        }
        .result-false {
            color: #b96400;
        }

        input[type=text] {
            box-sizing: border-box;
            width: 400px;
            padding: 4px;
        }
    </style>
</head>
<body>
    <p>
        <label>
            Rule:<br>
            <input id="testValidatorRule" type="text" value="required && between:5,10">
        </label>
    </p>
    <p>
        <label>
            Test string:<br>
            <input id="testValidatorString" type="text" value="cats and dogs">
        </label>
    </p>
    <p>
        Result: <span id="testValidatorResult"></span>
    </p>

    <script type="text/javascript" src="js/Init.js"></script>
    <script type="text/javascript" src="js/Lexer.js"></script>
    <script type="text/javascript" src="js/Parser.js"></script>
    <script type="text/javascript" src="js/Validator.js"></script>
    <script type="text/javascript" src="js/Block.js"></script>
    <script type="text/javascript" src="js/BlockFactory.js"></script>
    <script type="text/javascript">
        (function() {
            console.log(window);

            var Validator = new window.Pupil.Validator();

            Validator.addFunction("required", function(value) {
                if (typeof value === "undefined" || value === "" || value === null) {
                    return false;
                }

                return true;
            });

            Validator.addFunction("min", function(value, min) {
                // If it's a number
                if ( ! isNaN(parseFloat(value)) && isFinite(value)) {
                    return value >= min;

                // If it's a string (or "not a number")
                } else {
                    return value.length >= min;
                }
            });

            Validator.addFunction("max", function(value, max) {
                // If it's a number
                if ( ! isNaN(parseFloat(value)) && isFinite(value)) {
                    return value <= max;

                // If it's a string (or "not a number")
                } else {
                    return value.length <= max;
                }
            });

            Validator.addFunction("between", function(value, min, max) {
                // If it's a number
                if ( ! isNaN(parseFloat(value)) && isFinite(value)) {
                    return (value >= min && value <= max);

                // If it's a string (or "not a number")
                } else {
                    return (value.length >= min && value.length <= max);
                }
            });

            var testRule = document.getElementById('testValidatorRule');
            var testValue = document.getElementById('testValidatorString');
            var testResult = document.getElementById('testValidatorResult');

            var doValidation = function() {
                var self = this;
                var changeValue = self.value;

                setTimeout(function() {
                    if (self.value == changeValue) {
                        var result = Validator.validate({
                            test: [testValue.value, testRule.value]
                        });

                        if (result.test == true) {
                            testResult.className = "result-true";
                            testResult.innerHTML = "TRUE";
                        } else {
                            testResult.className = "result-false";
                            testResult.innerHTML = "FALSE";
                        }
                    }
                }, 200);
            };

            testValue.onchange = function() {
                doValidation.apply(this);
            };
            testRule.onchange = function() {
                doValidation.apply(this);
            };

            doValidation(testValue);
        })();
    </script>
</body>
</html>