const joi = require('@hapi/joi');
const {
    productIdSchema
} = require('./products');

const invoiceProductSoldUnitsSchema = joi.number().min(0);
const invoiceProductSoldPrice = joi.number().min(0);

const invoiceProductSchema = joi.object().keys({
    id: productIdSchema.required(),
    unitsTotalPrice: invoiceProductSoldPrice.required(),
    soldUnits: invoiceProductSoldUnitsSchema.required()
});

module.exports = invoiceProductSchema;