
(function() {
    
    'use strict';

    const fs = require('fs');
    const path = require('path');

    function getBalanceDue() {

        const file1Path = path.join(__dirname, 'data', 'file1.json');
        const file2Path = path.join(__dirname, 'data', 'file2.json');
        
        const data1 = JSON.parse(fs.readFileSync(file1Path, 'utf8'));
        console.log('Printing file 1 data: ', data1);
        console.log('I am blocked until file 1 is read. Unblock me');

        const data2 = JSON.parse(fs.readFileSync(file2Path, 'utf8'));
        console.log('Printing file 2 data: ', data2);
        console.log('I am blocked until file 1 & 2 are read. Unblock me');

        const result = data1.balanceDue + data2.balanceDue;

        console.log('I need results from both files before running so I need to wait. Result is ', result);

        return result;
    }

    module.exports = getBalanceDue;

})();
