
(function() {

    'use strict';

    const jestConfig = {
        verbose: true,
        modulePathIgnorePatterns: ['<rootDir>/src/data/'],
        modulePaths: ['<rootDir>/src/'],
        collectCoverage: true,
        collectCoverageFrom: ['src/**/*.js']
    };

    module.exports = jestConfig;

})();
