const express = require('express');
const InvoicesService = require('../services/invoices');
const ProductsService = require('../services/products');
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
    const productsService = new ProductsService();

    router.get('/', async function (req, res, next) {
        try {
            const invoices = await invoicesService.getInvoices();
            handleGetRequest(res, invoices, 'Facturas', 'as');
        } catch (error) {
            next(error);
        }
    });

    router.post('/', validationHandler(createInvoiceSchema), async function (req, res, next) {
        const {
            body: invoice
        } = req;
        try {
            const createdInvoiceId = await invoicesService.createInvoice({
                invoice
            });
            const updatedProductsUnits = await productsService.decreaseProductsUnits(invoice.soldProducts);

            handleCreateRequest(res, {
                createdInvoiceId,
                updatedProductsUnits
            }, 'Factura', 'a');
        } catch (error) {
            next(error);
        }
    });
};

module.exports = invoicesApi;