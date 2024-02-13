const Ajv = require("ajv")

const ajv = new Ajv()

function validateBody(schema) {
  return function (req, res, next) {
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
      res.status(400).send(ajv.errors[0])
    } else {
      next()
    }
  }
}



module.exports = { validateBody }