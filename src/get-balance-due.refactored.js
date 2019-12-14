(function() {

    'use strict';

    const fs = require('fs');
    const util = require('util');
    const path = require('path');
    const EventEmitter = require('events');

    const readFileAsync = util.promisify(fs.readFile);

    const synchronization = {
        file1DataReady: false,
        file1Data: null,
        file2DataReady: false,
        file2Data: null
    };

    const emitter = new EventEmitter();
    emitter.on('dataReady', function(key, value) {
        synchronization[key] = value;
        synchronization[key+'Ready'] = true;
        if(synchronization.file1DataReady && synchronization.file2DataReady) {
            processFile1And2Data(synchronization.file1Data, synchronization.file2Data);
        }
    });

    async function readFile1AndProcessData(file1Path) {
        const data1 = JSON.parse(await readFileAsync(file1Path));
        console.log('Printing file 1 data: ', data1);
        emitter.emit('dataReady', 'file1Data', data1);
    }

    async function readFile2AndProcessData(file2Path) {
        const data2 = JSON.parse(await readFileAsync(file2Path));
        console.log('Printing file 2 data: ', data2);
        emitter.emit('dataReady', 'file2Data', data2);
    }

    function processFile1And2Data(data1, data2) {
        const result = data1.balanceDue + data2.balanceDue;
        console.log('I need results from both files before running so I need to wait. Result is ', result);
        emitter.emit('resultReady', result);
    }

    function getBalanceDue() {

        return new Promise(function(resolve) {

            emitter.on('resultReady', function(result) {
                return resolve(result);
            });

            const file1Path = path.join(__dirname, 'data', 'file1.json');
            const file2Path = path.join(__dirname, 'data', 'file2.json');
            
            readFile1AndProcessData(file1Path);
            console.log('I am blocked until file 1 is read. Unblock me');
        

            readFile2AndProcessData(file2Path);
            console.log('I am blocked until file 1 & 2 are read. Unblock me');

        });
        
    }

    module.exports = getBalanceDue;

})();