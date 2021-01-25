const GetBillsToPayRouter = require('../../presentation/routers/get-bills-to-pay-router');
const GetBillsToPayUseCase = require('../../domain/usecases/get-bills-to-pay-usecase');
const GetBillsToPayRepository = require('../../infra/repositories/get-bills-to-pay-repository');

module.exports = class CreateBillsToPayComposer {
  static compose() {
    const getBillsToPayRepository = new GetBillsToPayRepository();

    const getBillsToPayUseCase = new GetBillsToPayUseCase({
      getBillsToPayRepository
    });

    return new GetBillsToPayRouter({
      getBillsToPayUseCase
    });
  }
};
