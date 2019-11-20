const joi = require('@hapi/joi');
const invoiceProductSchema = require('./invoiceProduct');

const invoiceIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const invoiceValueSchema = joi.number().min(0);
const invoiceSoldProductsSchema = joi.array().items(invoiceProductSchema);

const createInvoiceSchema = {
    creationDate: joi.date().required(),
    totalPrice: invoiceValueSchema.required(),
    soldProducts: invoiceSoldProductsSchema.required().min(1)
};

module.exports = {
    createInvoiceSchema,
    invoiceIdSchema
}