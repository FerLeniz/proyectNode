const joi = require("joi");

const validator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).max(10).required().messages({
            "string.empty": "Empty name...",
        }),
        age: joi.number().min(18).less(18).required(),
        lastname: joi.string().trim().min(2).max(15).required(),
        email: joi.string().required().trim().email(),
        password: joi.string().trim().required().min(6).max(250).messages({
            "string.empty": "Empty password, try again",
            
        }),
    });

    const validation = schema.validate(req.body, {
        abortEarly: false
    });
    if (!validation.error) {
        next();
    } else {
        console.log(validation.error.details)
        res.render("signup", {
            title: "Sign Up",
            error: validation.error.details,
            loggedUser: false,
        })
        // res.json({ success: false, errors: validation.error.details });
    }
    //next();
};

module.exports = validator;