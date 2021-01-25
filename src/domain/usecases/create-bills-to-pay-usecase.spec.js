/* eslint-disable import/no-extraneous-dependencies */
const chance = require('chance')();
const { MissingParamError } = require('../../utils/errors');
const CreateBillsToPayUseCase = require('./create-bills-to-pay-usecase');

const body = {
  name: chance.name(),
  originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
  dueDate: chance.date({ string: true }).replace('/', ''),
  payDay: chance.date({ string: true }).replace('/', ''),
  correctedValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
  numberOfDaysLate: chance.integer({ min: 0, max: 1000 }),
  delayRate: chance.floating({ min: 0, max: 5, fixed: 2 }),
  interestDay: chance.floating({ min: 0, max: 3, fixed: 2 }),
  totalInterest: chance.floating({ min: 0, max: 10, fixed: 2 }),
};

const makeCreateBillsToPayRepository = () => {
  class CreateBillsToPayRepositorySpy {
    async create(data) {
      this.data = data;
      return this.billsToPay;
    }
  }
  const createBillsToPayRepositorySpy = new CreateBillsToPayRepositorySpy();
  createBillsToPayRepositorySpy.billsToPay = body;
  return createBillsToPayRepositorySpy;
};

const makeBillsToPayCalculateSpy = () => {
  class BillsToPayCalculateSpy {
    async calculate(numberOfDaysLate, originalValue) {
      this.numberOfDaysLate = numberOfDaysLate;
      this.originalValue = originalValue;
      return this.simulationCalculated;
    }
  }
  const billsToPayCalculateSpy = new BillsToPayCalculateSpy();
  billsToPayCalculateSpy.simulationCalculated = {
    correctedValue: body.correctedValue,
    numberOfDaysLate: body.numberOfDaysLate,
    delayRate: body.delayRate,
    interestDay: body.interestDay,
    totalInterest: body.totalInterest,
  };
  return billsToPayCalculateSpy;
};

const makeBillsToPayCalculateSpyWithError = () => {
  class BillsToPayCalculateSpy {
    async calculate() {
      throw new Error();
    }
  }
  return new BillsToPayCalculateSpy();
};

const makeCreateBillsToPayRepositoryWithError = () => {
  class CreateBillsToPayRepositorySpy {
    async create() {
      throw new Error();
    }
  }
  return new CreateBillsToPayRepositorySpy();
};

const makeSut = () => {
  const createBillsToPayRepositorySpy = makeCreateBillsToPayRepository();
  const billsToPayCalculateSpy = makeBillsToPayCalculateSpy();

  const sut = new CreateBillsToPayUseCase({
    createBillsToPayRepository: createBillsToPayRepositorySpy,
    billsToPayCalculate: billsToPayCalculateSpy,
  });

  return {
    sut,
    createBillsToPayRepositorySpy,
    billsToPayCalculateSpy,
  };
};

describe('Create bills to pay UseCase', () => {
  test('Should throw if no name is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.store();
    expect(promise).rejects.toThrow(new MissingParamError('name'));
  });

  test('Should throw if no originalValue is provided', async () => {
    const { sut } = makeSut();
    const name = chance.name();
    const promise = sut.store(name);
    expect(promise).rejects.toThrow(new MissingParamError('originalValue'));
  });

  test('Should throw if no dueDate is provided', async () => {
    const { sut } = makeSut();
    const name = chance.name();
    const originalValue = chance.floating({ min: 0, max: 1000, fixed: 2 });
    const promise = sut.store(name, originalValue);
    expect(promise).rejects.toThrow(new MissingParamError('dueDate'));
  });

  test('Should throw if no payDay is provided', async () => {
    const { sut } = makeSut();
    const name = chance.name();
    const originalValue = chance.floating({ min: 0, max: 1000, fixed: 2 });
    const duoDate = chance.date();
    const promise = sut.store(name, originalValue, duoDate);
    expect(promise).rejects.toThrow(new MissingParamError('payDay'));
  });

  test('Should call CreateBillsToPayRepository with correct values', async () => {
    const { sut, createBillsToPayRepositorySpy } = makeSut();
    await sut.store(body.name, body.originalValue, body.dueDate, body.payDay);

    expect(createBillsToPayRepositorySpy.billsToPay).toEqual({
      name: body.name,
      originalValue: body.originalValue,
      dueDate: body.dueDate,
      payDay: body.payDay,
      correctedValue: body.correctedValue,
      numberOfDaysLate: body.numberOfDaysLate,
      delayRate: body.delayRate,
      interestDay: body.interestDay,
      totalInterest: body.totalInterest,
    });
  });

  test('Should throw if invalid dependencies are provided', async () => {
    const invalid = {};
    const createBillsToPayRepository = makeCreateBillsToPayRepository();
    const billsToPayCalculate = makeBillsToPayCalculateSpy();
    const suts = [].concat(
      new CreateBillsToPayUseCase(),
      new CreateBillsToPayUseCase({}),
      new CreateBillsToPayUseCase({
        createBillsToPayRepository: invalid,
      }),
      new CreateBillsToPayUseCase({
        createBillsToPayRepository,
      }),
      new CreateBillsToPayUseCase({
        billsToPayCalculate,
      }),
      new CreateBillsToPayUseCase({
        createBillsToPayRepository,
        billsToPayCalculate: invalid,
      }),
      new CreateBillsToPayUseCase({
        createBillsToPayRepository: invalid,
        billsToPayCalculate,
      })
    );
    suts.forEach((sut) => {
      const promise = sut.store(body);
      expect(promise).rejects.toThrow();
    });
  });

  test('Should throw if any dependency throws', async () => {
    const createBillsToPayRepository = makeCreateBillsToPayRepository();
    const billsToPayCalculate = makeBillsToPayCalculateSpy();
    const suts = [].concat(
      new CreateBillsToPayUseCase({
        createBillsToPayRepository: makeCreateBillsToPayRepositoryWithError(),
      }),
      new CreateBillsToPayUseCase({
        billsToPayCalculate: makeBillsToPayCalculateSpyWithError(),
      }),
      new CreateBillsToPayUseCase({
        createBillsToPayRepository,
        billsToPayCalculate: makeBillsToPayCalculateSpyWithError(),
      }),
      new CreateBillsToPayUseCase({
        createBillsToPayRepository: makeCreateBillsToPayRepositoryWithError(),
        billsToPayCalculate,
      })
    );
    suts.forEach((sut) => {
      const promise = sut.store(body);
      expect(promise).rejects.toThrow();
    });
  });
});
