const MongoLib = require('../lib/mongo');

class InvoicesService {

    constructor() {
        this.collection = 'invoices';
        this.mongoDB = new MongoLib();
    }

    async getInvoices(user) {
        const invoices = await this.mongoDB.getAll(this.collection, {
            user
        }, {});
        return invoices || [];
    }

    async createInvoice({
        invoice,
        user
    }) {
        invoice['creationTime'] = new Date().getTime();
        invoice['user'] = user;
        const createdInvoiceId = await this.mongoDB.create(this.collection, invoice);
        return createdInvoiceId;
    }

    async deleteInvoice(invoiceId) {
        const deletedInvoiceId = await this.mongoDB.delete(
            this.collection,
            invoiceId
        );
        return deletedInvoiceId;
    }
}

module.exports = InvoicesService;