const { isBefore, parseISO, differenceInCalendarDays } = require('date-fns');

const { MissingParamError } = require('../../utils/errors');

module.exports = class CreateBillsToPayUseCase {
  constructor({ createBillsToPayRepository, billsToPayCalculate } = {}) {
    this.createBillsToPayRepository = createBillsToPayRepository;
    this.billsToPayCalculate = billsToPayCalculate;
  }

  async store(name, originalValue, dueDate, payDay) {
    if (!name) {
      throw new MissingParamError('name');
    }
    if (!originalValue) {
      throw new MissingParamError('originalValue');
    }
    if (!dueDate) {
      throw new MissingParamError('dueDate');
    }
    if (!payDay) {
      throw new MissingParamError('payDay');
    }

    const data = {
      name,
      originalValue,
      dueDate,
      payDay,
    };

    const parseDueDate = parseISO(dueDate);
    const parsePayDay = parseISO(payDay);

    if (isBefore(parseDueDate, parsePayDay)) {
      const numberOfDaysLate = differenceInCalendarDays(
        parsePayDay,
        parseDueDate
      );

      const calculated = this.billsToPayCalculate.calculate(
        numberOfDaysLate,
        originalValue
      );

      if (!calculated) {
        throw new Error('Error to calculate.');
      }

      data.correctedValue = calculated.correctedValue;
      data.numberOfDaysLate = calculated.numberOfDaysLate;
      data.delayRate = calculated.delayRate;
      data.interestDay = calculated.interestDay;
      data.totalInterest = calculated.totalInterest;
    }

    const billsToPay = await this.createBillsToPayRepository.create(data);

    return billsToPay;
  }
};
