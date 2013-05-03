# Pupil
Pupil is a multi-purpose validation library for JavaScript and PHP that supports deeply nested validation rules.

## Usage

### JavaScript
The following example:

    // Create a validator instance
    var Validator = new window.Pupil.Validator();
    
    // Add a validator function
    Validator.addFunction("min", function(value, min) {
      return parseFloat(value) >= min;
    });
    
    // Validate a string
    var result = Validator.validate({
      test: [5, "min:10"],
      test2: [15, "min:10"]
    });
    
    console.log(result);
Will output:

    [test: false, test2: true]

#### Deeply nested rules
The following example:

    Validator.validate({
      test: [18, "min:5 && (max:10 || between:15,20)"]
    });

Would return true, as even though 18 is over the given "max", it's between 15 and 20, which is marked as an "OR" rule alongside "max:10".
## TODO
* Concatenate and minify the JS files
* Start work on the PHP version
* Add parser caching
