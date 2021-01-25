const HttpResponse = require('../helpers/http-response');

module.exports = class GetBillsToPayRouter {
  constructor({ getBillsToPayUseCase } = {}) {
    this.getBillsToPayUseCase = getBillsToPayUseCase;
  }

  async route() {
    try {
      const billPayments = await this.getBillsToPayUseCase.index();

      return HttpResponse.ok(billPayments);
    } catch (error) {
      return HttpResponse.serverError();
    }
  }
};
