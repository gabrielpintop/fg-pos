const express = require('express');
const InvoicesService = require('../services/invoices');
const {
    createInvoiceSchema
} = require('../schemas/invoices');
const validationHandler = require('../utils/middleware/validationHandler');
const {
    handleCreateRequest,
    handleGetRequest
} = require('../utils/handleSuccessfulRequest');

function invoicesApi(app) {
    const router = express.Router();
    app.use('/api/invoices', router);

    const invoicesService = new InvoicesService();

    router.get('/', async (req, res, next) => {
        try {
            const invoices = await invoicesService.getInvoices();
            handleGetRequest(res, invoices, 'Facturas', 'as');
        } catch (error) {
            next(error);
        }
    });

    router.post('/', validationHandler(createInvoiceSchema), async (req, res, next) => {
        const {
            body: invoice
        } = req;
        try {
            const createdInvoiceId = await invoicesService.createInvoice({
                invoice
            });
            handleCreateRequest(res, createdInvoiceId, 'Factura', 'a');
        } catch (error) {
            next(error);
        }
    });
};

module.exports = invoicesApi;