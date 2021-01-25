const CreateBillsToPayRouter = require('../../presentation/routers/create-bills-to-pay-router');
const CreateBillsToPayUseCase = require('../../domain/usecases/create-bills-to-pay-usecase');
const CreateBillsToPayRepository = require('../../infra/repositories/create-bills-to-pay-repository');
const BillsToPayCalculate = require('../../utils/helpers/bills-to-pay-calculate');

module.exports = class CreateBillsToPayComposer {
  static compose() {
    const createBillsToPayRepository = new CreateBillsToPayRepository();
    const billsToPayCalculate = new BillsToPayCalculate();

    const createBillsToPayUseCase = new CreateBillsToPayUseCase({
      createBillsToPayRepository,
      billsToPayCalculate
    });

    return new CreateBillsToPayRouter({
      createBillsToPayUseCase
    });
  }
};
