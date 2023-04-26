const { message } = require('./thirdparty/message');
const INFO_NOTIFICATION_LEVEL = 4;
const CRITICAL_NOTIFICATION_LEVEL = 1;

module.exports = class CollectOrderService {
    constructor(collectService, orderService) {
        this.collectService = collectService;
        this.orderService = orderService;
    }

    notify(order) {
        if (this.collectService.isEligibleForCollection(order))
            this.orderService.notifyCustomer(message.READY_FOR_COLLECT, INFO_NOTIFICATION_LEVEL);
        else
            this.orderService.notifyCustomer(message.IMPOSSIBLE_TO_COLLECT, CRITICAL_NOTIFICATION_LEVEL);
    }

    setCollectionService(collectService) {
        this.collectService = collectService;
    }

    setNotificationService(orderService) {
        this.orderService = orderService;
    }
};
