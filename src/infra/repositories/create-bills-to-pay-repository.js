const MissingParamError = require('../../utils/errors/missing-param-error');
const MongoHelper = require('../helpers/mongo-helper');

module.exports = class CreateBillsToPayRepository {
  async create(data) {
    if (!data) {
      throw new MissingParamError('data');
    }

    const billsToPayModel = await MongoHelper.getCollection('billsToPay');
    const billsToPay = await billsToPayModel.insertOne(data);

    return billsToPay.ops[0];
  }
};
