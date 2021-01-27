const HttpResponse = require('../helpers/http-response');
const { MissingParamError } = require('../../utils/errors');

module.exports = class CreateBillsToPayRouter {
  constructor({ createBillsToPayUseCase } = {}) {
    this.createBillsToPayUseCase = createBillsToPayUseCase;
  }

  async route(httpRequest) {
    try {
      const { name, originalValue, dueDate, payDay } = httpRequest.body;

      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'));
      }

      if (!originalValue) {
        return HttpResponse.badRequest(new MissingParamError('originalValue'));
      }

      if (!dueDate) {
        return HttpResponse.badRequest(new MissingParamError('dueDate'));
      }

      if (!payDay) {
        return HttpResponse.badRequest(new MissingParamError('payDay'));
      }

      const payment = await this.createBillsToPayUseCase.store(
        name,
        originalValue,
        dueDate,
        payDay
      );

      return HttpResponse.create(payment);
    } catch (error) {
      return HttpResponse.serverError();
    }
  }
};
