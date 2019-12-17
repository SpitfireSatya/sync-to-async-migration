(function() {
  
  "use strict";

  const fs = require("fs");
  const path = require("path");
  const util = require("util");

  const readFileAsync = util.promisify(fs.readFile);

  function performAsyncTasks(file1Path, file2Path) {
    return Promise.all([
      readFileAsync(file1Path),
      readFileAsync(file2Path)
    ]).then(function([data1, data2]) {

      data1 = JSON.parse(data1);
      console.log("Printing file 1 data: ", data1);

      data2 = JSON.parse(fs.readFileSync(file2Path, "utf8"));
      console.log("Printing file 2 data: ", data2);

      const result = data1.balanceDue + data2.balanceDue;

      console.log("I need results from both files before running so I need to wait. Result is ", result);
      return result;

    });
  }

  function getBalanceDue() {

    const file1Path = path.join(__dirname, "data", "file1.json");
    const file2Path = path.join(__dirname, "data", "file2.json");

    const promise = performAsyncTasks(file1Path, file2Path);

    console.log("I am blocked until file 1 is read. Unblock me");

    console.log("I am blocked until file 1 & 2 are read. Unblock me");
    
    return promise;

  }

  module.exports = getBalanceDue;

})();
