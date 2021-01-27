/* eslint-disable no-restricted-syntax */
const chance = require('chance')();
const GetBillsToPayUseCase = require('./get-bills-to-pay-usecase');

const body = [
  {
    name: chance.name(),
    originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
    dueDate: chance.date({ string: true }).replace('/', ''),
    payDay: chance.date({ string: true }).replace('/', ''),
  },
  {
    name: chance.name(),
    originalValue: chance.floating({ min: 0, max: 1000, fixed: 2 }),
    dueDate: chance.date({ string: true }).replace('/', ''),
    payDay: chance.date({ string: true }).replace('/', ''),
  },
];

const makeGetBillsToPayRepository = () => {
  class GetBillsToPayRepositorySpy {
    async get(data) {
      this.data = data;
      return this.billsToPayments;
    }
  }
  const getBillsToPayRepositorySpy = new GetBillsToPayRepositorySpy();
  getBillsToPayRepositorySpy.billsToPayments = body;
  return getBillsToPayRepositorySpy;
};

const makeGetBillsToPayRepositoryEmptyList = () => {
  class GetBillsToPayRepositorySpy {
    async get(data) {
      this.data = data;
      return this.billsToPayments;
    }
  }
  const getBillsToPayRepositorySpy = new GetBillsToPayRepositorySpy();
  getBillsToPayRepositorySpy.billsToPayments = [];
  return getBillsToPayRepositorySpy;
};

const makeGetBillsToPayRepositoryWithError = () => {
  class GetBillsToPayRepositorySpy {
    async index() {
      throw new Error();
    }
  }
  return new GetBillsToPayRepositorySpy();
};

const makeSut = () => {
  const getBillsToPayRepositorySpy = makeGetBillsToPayRepository();
  const getBillsToPayRepositoryEmptyListSpy = makeGetBillsToPayRepositoryEmptyList();

  const sut = new GetBillsToPayUseCase({
    getBillsToPayRepository: getBillsToPayRepositorySpy,
  });

  return {
    sut,
    getBillsToPayRepositorySpy,
    getBillsToPayRepositoryEmptyListSpy,
  };
};

describe('Create bills to pay UseCase', () => {
  test('Should return array when there are accounts payable records', async () => {
    const { sut, getBillsToPayRepositorySpy } = makeSut();
    await sut.index();

    expect(Array.isArray(getBillsToPayRepositorySpy.billsToPayments)).toBe(
      true
    );
    expect(getBillsToPayRepositorySpy.billsToPayments.length).toBeGreaterThan(
      0
    );
  });

  test('Should return empty array when there are no accounts payable records', async () => {
    const { sut, getBillsToPayRepositoryEmptyListSpy } = makeSut();
    await sut.index();

    expect(
      Array.isArray(getBillsToPayRepositoryEmptyListSpy.billsToPayments)
    ).toBe(true);
    expect(getBillsToPayRepositoryEmptyListSpy.billsToPayments).toHaveLength(0);
  });

  test('Should throw if invalid dependencies are provided', async () => {
    const invalid = {};
    const suts = [].concat(
      new GetBillsToPayUseCase(),
      new GetBillsToPayUseCase({}),
      new GetBillsToPayUseCase({
        getBillsToPayRepository: invalid,
      })
    );
    suts.forEach((sut) => {
      const promise = sut.index(body);
      expect(promise).rejects.toThrow();
    });
  });

  test('Should throw if any dependency throws', async () => {
    const suts = [].concat(
      new GetBillsToPayUseCase({
        getBillsToPayRepository: makeGetBillsToPayRepositoryWithError(),
      })
    );
    suts.forEach((sut) => {
      const promise = sut.index(body);
      expect(promise).rejects.toThrow();
    });
  });
});
