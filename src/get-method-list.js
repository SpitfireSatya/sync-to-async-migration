
(function() {

    'use strict';

    const fs = require('fs');
    const path = require('path');

    fs.readFile(path.resolve(__dirname, 'data', 'nodeJS-documentation.json'), 'utf8', function(err, data) {
        let syncAsyncMethodPair = {};
        const docs = JSON.parse(data);

        Object.keys(docs).forEach(function(key) {
            docs[key].forEach(function(nodeModule) {
                if(nodeModule.methods) {
                    nodeModule.methods.forEach(function(methodSync) {
                        if(methodSync.name.endsWith('Sync')) {
                            nodeModule.methods.forEach(function(methodAsync) {
                                if(methodSync.name.startsWith(methodAsync.name) && methodSync.name !== methodAsync.name) {
                                    syncAsyncMethodPair[methodSync.name] = {
                                        module: nodeModule.name,
                                        asyncName: methodAsync.name,
                                        asyncSignature: methodAsync.signatures,
                                        syncSignature: methodSync.signatures
                                    };
                                }
                            });
                        }
                    });
                }
            });
        });
        
        fs.writeFileSync(path.join(__dirname, 'data', 'sync-async-pair.json'), JSON.stringify(syncAsyncMethodPair, null, 2), 'utf8');

    });

})();