const chance = require('chance')();
const request = require('supertest');
const app = require('../config/app');
const MongoHelper = require('../../infra/helpers/mongo-helper');

let billsToPayModel;

describe('Bills to pay Routes', () => {
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

  describe('Sucess case 200', () => {
    test('Should return 200 when there are accounts payable records', async () => {
      await billsToPayModel.insertOne({
        name: chance.name(),
        originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        dueDate: chance.date(),
        payDay: chance.date(),
      });
      await request(app).get('/api/bills-to-pay').send().expect(200);
    });
  });

  describe('Sucess case 201', () => {
    test('Should return 201 when successfully registering accounts payable', async () => {
      const data = {
        name: chance.name(),
        originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        dueDate: chance.date(),
        payDay: chance.date(),
      };
      await request(app).post('/api/bills-to-pay').send(data).expect(201);
    });
  });

  describe('failure cases 400', () => {
    test('Should return 400 when not providing name', async () => {
      const data = {
        originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        dueDate: chance.date(),
        payDay: chance.date(),
      };
      await request(app).post('/api/bills-to-pay').send(data).expect(400);
    });

    test('Should return 400 when not providing originalValue', async () => {
      const data = {
        name: chance.name(),
        dueDate: chance.date(),
        payDay: chance.date(),
      };
      await request(app).post('/api/bills-to-pay').send(data).expect(400);
    });

    test('Should return 400 when not providing dueDate', async () => {
      const data = {
        name: chance.name(),
        originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        payDay: chance.date(),
      };
      await request(app).post('/api/bills-to-pay').send(data).expect(400);
    });

    test('Should return 400 when not providing payDay', async () => {
      const data = {
        name: chance.name(),
        originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
        dueDate: chance.date(),
      };
      await request(app).post('/api/bills-to-pay').send(data).expect(400);
    });
  });
});
