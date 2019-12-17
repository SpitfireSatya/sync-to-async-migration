
(function() {

  "use strict";

  const fs = require("fs");
  const path = require("path");
  const esprima = require("esprima");

  const esprimaConfig = {
    loc: false,
    range: false,
    tokens: false,
    comment: true,
    tolerant: true,
    attachComment: true
  };

  fs.readFile(path.resolve(__dirname, "get-balance-due.js"), "utf8", function(err, data) {
    const ast = esprima.parse(data, esprimaConfig);
    fs.writeFileSync(path.resolve(__dirname, "get-balance-due.ast.json"), JSON.stringify(ast, null, 2), 'utf8');
  });

})();
