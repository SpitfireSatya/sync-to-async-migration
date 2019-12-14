
(async function() {

  "use strict";

  const getBalanceDueRefactored = require('./get-balance-due.refactored');
  const getBalanceDue = require('./get-balance-due');

  const data1 = await getBalanceDueRefactored();
  console.log('Printing Data1 in the calling function: ', data1);

  const data2 = getBalanceDue();
  console.log('Printing Data2 in the calling function: ', data2);

})();
