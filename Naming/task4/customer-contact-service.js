const CustomerContact = require('./thirdparty/customer-contact');
const CustomersContactDao = require('./thirdparty/customer-contact-dao');

module.exports = class CustomerContactService {
    constructor(customersContacts: CustomersContactDao) {
        this.customersContacts = customersContacts;
    }

    findById(customerId) {
        return this.customersContacts.findByCustomerId(customerId);
    }

    update(customerContact: CustomerContact) {
        this.customersContacts.update(customerContact);
    }
};
