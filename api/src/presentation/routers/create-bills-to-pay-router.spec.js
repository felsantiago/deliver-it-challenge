const chance = require('chance')();
const CreateBillsToPayRouter = require('./create-bills-to-pay-router');
const { MissingParamError } = require('../../utils/errors');
const { ServerError } = require('../errors');

const makeCreateBillsToPayUseCase = () => {
  class CreateBillsToPayUseCaseSpy {
    async store(name, originalValue, dueDate, payDay) {
      this.name = name;
      this.originalValue = originalValue;
      this.dueDate = dueDate;
      this.payDay = payDay;
    }
  }
  return new CreateBillsToPayUseCaseSpy();
};

const makeSut = () => {
  const createBillsToPayUseCaseSpy = makeCreateBillsToPayUseCase();

  const sut = new CreateBillsToPayRouter({
    createBillsToPayUseCase: createBillsToPayUseCaseSpy,
  });
  return {
    sut,
    createBillsToPayUseCaseSpy,
  };
};

const makecreateBillsToPayUseCaseWithError = () => {
  class CreateBillsToPayUseCaseSpy {
    async store() {
      throw new Error();
    }
  }
  return new CreateBillsToPayUseCaseSpy();
};

describe('Create bills to pay Router', () => {
  describe('Sucess case', () => {
    test('Should call createBillsToPayUseCase with correct params', async () => {
      const { sut, createBillsToPayUseCaseSpy } = makeSut();
      const httpRequest = {
        body: {
          name: chance.name(),
          originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
          dueDate: chance.date(),
          payDay: chance.date(),
        },
      };
      await sut.route(httpRequest);
      expect(createBillsToPayUseCaseSpy.name).toBe(httpRequest.body.name);
      expect(createBillsToPayUseCaseSpy.originalValue).toBe(
        httpRequest.body.originalValue
      );
      expect(createBillsToPayUseCaseSpy.dueDate).toBe(httpRequest.body.dueDate);
      expect(createBillsToPayUseCaseSpy.payDay).toBe(httpRequest.body.payDay);
    });
  });

  describe('failure cases', () => {
    test('Should return 400 when not providing name', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
          dueDate: chance.date(),
          payDay: chance.date(),
        },
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body.error).toBe(
        new MissingParamError('name').message
      );
    });

    test('Should return 400 when not providing originalValue', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: chance.name(),
          dueDate: chance.date(),
          payDay: chance.date(),
        },
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body.error).toBe(
        new MissingParamError('originalValue').message
      );
    });

    test('Should return 400 when not providing dueDate', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: chance.name(),
          originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
          payDay: chance.date(),
        },
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body.error).toBe(
        new MissingParamError('dueDate').message
      );
    });

    test('Should return 400 when not providing payDay', async () => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          name: chance.name(),
          originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
          dueDate: chance.date(),
        },
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body.error).toBe(
        new MissingParamError('payDay').message
      );
    });

    test('Should return 500 if no httpRequest is provided', async () => {
      const { sut } = makeSut();
      const httpResponse = await sut.route();
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body.error).toBe(new ServerError().message);
    });

    test('Should return 500 if httpRequest has no body', async () => {
      const { sut } = makeSut();
      const httpResponse = await sut.route({});
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body.error).toBe(new ServerError().message);
    });
  });

  describe('Dependency injection error cases', () => {
    test('Should throw if invalid dependencies are provided', async () => {
      const invalid = {};
      const suts = [].concat(
        new CreateBillsToPayRouter(),
        new CreateBillsToPayRouter({}),
        new CreateBillsToPayRouter({
          createBillsToPayUseCase: invalid,
        })
      );
      suts.forEach(async (sut) => {
        const httpRequest = {
          body: {
            name: chance.name(),
            originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
            dueDate: chance.date(),
            payDay: chance.date(),
          },
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body.error).toBe(new ServerError().message);
      });
    });

    test('Should throw if any dependency throws', async () => {
      const suts = [].concat(
        new CreateBillsToPayRouter({
          createBillsToPayUseCase: makecreateBillsToPayUseCaseWithError(),
        })
      );
      suts.forEach(async (sut) => {
        const httpRequest = {
          body: {
            name: chance.name(),
            originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
            dueDate: chance.date(),
            payDay: chance.date(),
          },
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body.error).toBe(new ServerError().message);
      });
    });
  });
});
