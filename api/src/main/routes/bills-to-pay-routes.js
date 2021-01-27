const { adaptRoute } = require('../adapters/express-router-adapter');
const GetBillsToPayComposer = require('../composers/get-bills-to-pay-composer');
const CreateBillsToPayComposer = require('../composers/create-bills-to-pay-composer');

module.exports = (router) => {
  router.get('/bills-to-pay', adaptRoute(GetBillsToPayComposer.compose()));
  router.post('/bills-to-pay', adaptRoute(CreateBillsToPayComposer.compose()));
};
