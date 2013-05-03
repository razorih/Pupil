<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script type="text/javascript" src="js/Block.js"></script>
    <script type="text/javascript" src="js/BlockFactory.js"></script>
    <script type="text/javascript" src="js/BlockSeparator.js"></script>
    <script type="text/javascript">
        (function() {
            console.log(window);

            

            var factory = new window.BlockParser.BlockFactory(window.BlockParser.Block);
            var parser = new window.BlockParser.BlockSeparator(factory);

            var result = parser.parse("required && min:10 && (max:15 || between:20,25)");
            console.log(result);
        })();
    </script>
</body>
</html>