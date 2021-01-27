const MongoHelper = require('../helpers/mongo-helper');

module.exports = class GetBillsToPayRepository {
  async get() {
    const billsToPayModel = await MongoHelper.getCollection('billsToPay');
    return billsToPayModel.find().toArray();
  }
};
