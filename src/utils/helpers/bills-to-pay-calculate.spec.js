const chance = require('chance')();
const MissingParamError = require('../errors/missing-param-error');
const BillsToPayCalculate = require('./bills-to-pay-calculate');

const makeSut = () => new BillsToPayCalculate();

describe('Bills to pay calculate', () => {
  test('Should return simulated value if calculated', () => {
    const sut = makeSut();
    const numberOfDaysLate = chance.integer({ min: 1, max: 1000 });
    const originalValue = chance.floating({ min: 0, max: 1000, fixed: 2 });

    const isSimulated = sut.calculate(numberOfDaysLate, originalValue);
    expect(isSimulated).not.toBe(null);
  });

  test('Should throw if no params is provided', async () => {
    const sut = makeSut();
    const originalValue = chance.floating({ min: 0, max: 1000, fixed: 2 });

    expect(() => {
      sut.calculate(null, originalValue);
    }).toThrow(new MissingParamError('numberOfDaysLate'));
  });

  test('Should throw if no originalValue is provided', async () => {
    const sut = makeSut();
    const numberOfDaysLate = chance.integer({ min: 1, max: 1000 });

    expect(() => {
      sut.calculate(numberOfDaysLate);
    }).toThrow(new MissingParamError('originalValue'));
  });

  test('Should throw if no originalValue is provided 2', async () => {
    const sut = makeSut();

    const numberOfDaysLateInvalid = -1;
    const originalValue = chance.floating({ min: 0, max: 1000, fixed: 2 });

    const resultNull = sut.calculate(numberOfDaysLateInvalid, originalValue);
    expect(resultNull).toBeNull();
  });
});
