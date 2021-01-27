module.exports = class GetBillsToPayUseCase {
  constructor({ getBillsToPayRepository } = {}) {
    this.getBillsToPayRepository = getBillsToPayRepository;
  }

  async index() {
    const billsToPayments = this.getBillsToPayRepository.get();
    return billsToPayments;
  }
};
