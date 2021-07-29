import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required()
})


export const registrationSchema = Joi.object({
    firstname: Joi.string()
        .required(),
    lastname: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
    agreement: Joi.boolean()
})


export const validate = (schema: Joi.Schema, model: any) => {
    const result = schema.validate(model);
    return result;
}

export const getErrorMessage = (error: any) => {
    const { details } = error;
    return details.map((d: any) => d.message).join(" ");
}



