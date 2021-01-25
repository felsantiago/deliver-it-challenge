const chance = require('chance')();
const MongoHelper = require('../helpers/mongo-helper');
const CreateBillsToPayRepository = require('./create-bills-to-pay-repository');
const MissingParamError = require('../../utils/errors/missing-param-error');

let billsToPayModel;

const makeSut = () => new CreateBillsToPayRepository();

describe('CreateBillsToPay Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    billsToPayModel = await MongoHelper.getCollection('billsToPay');
  });

  beforeEach(async () => {
    await billsToPayModel.deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should register a new account payable record and return', async () => {
    const billsToPay = await billsToPayModel.insertOne({
      name: chance.name(),
      originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
      dueDate: chance.date(),
      payDay: chance.date(),
    });
    expect(billsToPay.ops[0]).toEqual({
      name: billsToPay.ops[0].name,
      originalValue: billsToPay.ops[0].originalValue,
      dueDate: billsToPay.ops[0].dueDate,
      payDay: billsToPay.ops[0].payDay,
      _id: billsToPay.ops[0]._id,
    });
  });

  test('Should throw if no body is provided', async () => {
    const sut = makeSut();
    const promise = sut.create();
    expect(promise).rejects.toThrow(new MissingParamError('data'));
  });
});
