const MissingParamError = require('../errors/missing-param-error');

const latePayment = [
  {
    name: 'até 3 dias',
    condition: (days) => days >= 1 && days <= 3,
    delayRate: 2,
    interestDay: 0.1,
  },
  {
    name: 'superior a 3 dias',
    condition: (days) => days >= 3 && days <= 5,
    delayRate: 3,
    interestDay: 0.2,
  },
  {
    name: 'superior a 5 dias',
    condition: (days) => days > 5,
    delayRate: 5,
    interestDay: 0.3,
  },
];

module.exports = class BillsToPayCalculate {
  calculate(numberOfDaysLate, originalValue) {
    if (!numberOfDaysLate) {
      throw new MissingParamError('numberOfDaysLate');
    }

    if (!originalValue) {
      throw new MissingParamError('originalValue');
    }

    const index = latePayment.findIndex((item) =>
      item.condition(numberOfDaysLate)
    );

    if (index >= 0) {
      const interestDay = latePayment[index].interestDay / 100;
      const loadDays =
        (originalValue + latePayment[index].delayRate) * interestDay;
      const totalInterest = loadDays * numberOfDaysLate;
      const totalInterestMorePenalty =
        latePayment[index].delayRate + totalInterest;

      return {
        correctedValue: originalValue + totalInterestMorePenalty,
        numberOfDaysLate,
        delayRate: latePayment[index].delayRate,
        interestDay: latePayment[index].interestDay,
        totalInterest,
      };
    }

    return null;
  }
};
