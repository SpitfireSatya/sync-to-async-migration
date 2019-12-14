
const globalMocks = require('../global-mocks');

describe('getBalanceDue', () => {

    let getBalanceDue;

    beforeAll(() => {
        Object.assign(global, globalMocks);
        getBalanceDue = require('./get-balance-due.refactored');
    });

    it('should print the data from our file', async () => {
        await getBalanceDue();
    });

});
