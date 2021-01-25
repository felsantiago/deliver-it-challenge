const chance = require('chance')();
const GetBillsToPayRouter = require('./get-bills-to-pay-router');
const { ServerError } = require('../errors');

const makeGetBillsToPayUseCase = () => {
  class GetBillsToPayUseCaseSpy {
    async index() {
      return [
        {
          name: chance.name(),
          originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
          dueDate: chance.date(),
          payDay: chance.date(),
        },
      ];
    }
  }
  return new GetBillsToPayUseCaseSpy();
};

const makeGetBillsToPayUseCaseWithEmptyList = () => {
  class GetBillsToPayUseCaseSpy {
    async index() {
      return [];
    }
  }
  return new GetBillsToPayUseCaseSpy();
};

const makeGetBillsToPayUseCaseWithError = () => {
  class GetBillsToPayUseCaseSpy {
    async index() {
      throw new Error();
    }
  }
  return new GetBillsToPayUseCaseSpy();
};

describe('Get bills to pay Router', () => {
  describe('Sucess case', () => {
    test('Should return 200 when there are accounts payable records', async () => {
      const sut = new GetBillsToPayRouter({
        getBillsToPayUseCase: makeGetBillsToPayUseCase(),
      });
      const httpRequest = {};
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(200);
      expect(Array.isArray(httpResponse.body)).toBe(true);
      expect(httpResponse.body.length).toBeGreaterThan(0);
    });

    test('Should return 200 when there are no accounts payable records', async () => {
      const sut = new GetBillsToPayRouter({
        getBillsToPayUseCase: makeGetBillsToPayUseCaseWithEmptyList(),
      });
      const httpRequest = {};
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(200);
      expect(Array.isArray(httpResponse.body)).toBe(true);
      expect(httpResponse.body).toHaveLength(0);
    });
  });

  describe('Dependency injection error cases', () => {
    test('Should throw if invalid dependencies are provided', async () => {
      const invalid = {};
      const suts = [].concat(
        new GetBillsToPayRouter(),
        new GetBillsToPayRouter({}),
        new GetBillsToPayRouter({
          getBillsToPayUseCase: invalid,
        })
      );
      suts.forEach(async (sut) => {
        const httpRequest = {};
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body.error).toBe(new ServerError().message);
      });
    });

    test('Should throw if any dependency throws', async () => {
      const suts = [].concat(
        new GetBillsToPayRouter({
          getBillsToPayUseCase: makeGetBillsToPayUseCaseWithError(),
        })
      );
      suts.forEach(async (sut) => {
        const httpRequest = {};
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body.error).toBe(new ServerError().message);
      });
    });
  });
});
