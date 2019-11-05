const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productActiveSchema = joi.boolean();
const productBoughtUnitsSchema = joi.number().min(0);
const productClientPriceSchema = joi.number().min(0);
const productDescriptionSchema = joi.string().max(200);
const productImageSchema = joi.string().uri();
const productNameSchema = joi.string();
const productSoldUnitsSchema = joi.number().min(0);
const productUnitaryPriceSchema = joi.number().min(0);
const productUnitsSchema = joi.number().min(0);

module.exports = {
    productIdSchema
}