// function to validate Joi validation schema 
exports.validator = (schema, type = 'body') => {
    return (req, res, next) => {

        let validation = []
        let bodyValidation, queryValidation;

        // in case we need to validate body
        if (type === 'body' || type === 'bodyAndQuery') {
            bodyValidation = schema.body.validate(req.body);
            if (bodyValidation.error) {
                validation.push(bodyValidation.error.details[0].message)
            }
        }

        // in case we need to validate params
        if (type === 'query' || type === 'bodyAndQuery') {
            queryValidation = schema.query.validate(req.query);
            if (queryValidation.error) {
                validation.push(queryValidation.error.details[0].message)
            }
        }

        if (validation.length) {
            return res.status(400).json({
                success: false,
                error: "Validation Error !",
                message: validation.join(),
            });
        }

        next();
    }

};