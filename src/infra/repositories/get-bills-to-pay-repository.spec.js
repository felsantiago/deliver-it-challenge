const chance = require('chance')();
const MongoHelper = require('../helpers/mongo-helper');
const GetBillsToPayRepository = require('./get-bills-to-pay-repository');

let billsToPayModel;

const makeSut = () => new GetBillsToPayRepository();

describe('CreateBillsToPay Repository', () => {
  const data = {
    name: chance.name(),
    originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
    dueDate: chance.date(),
    payDay: chance.date(),
  };

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    billsToPayModel = await MongoHelper.getCollection('billsToPay');
  });

  beforeEach(async () => {
    await billsToPayModel.deleteMany();
    await billsToPayModel.insertOne(data);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return the list of accounts payable', async () => {
    const sut = makeSut();
    const fakeBillsToPay = await sut.get();
    expect(Array.isArray(fakeBillsToPay)).toBe(true);
    expect(fakeBillsToPay[0]).toEqual(data);
  });
});
