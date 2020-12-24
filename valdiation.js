const Joi = require('joi');

const schema = Joi.object({
    message: Joi.string().required(),
    userIds: Joi.array().items(Joi.number().min(1).required())
})

const validateBody = body => schema.validate(body);

module.exports = validateBody
