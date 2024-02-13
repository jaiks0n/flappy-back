const signupSchema = {
  type: 'object',
  properties: {
    lastName: { type: 'string' },
    firstName: { type: 'string' },
    nickname: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['lastName','firstName','nickname', 'email', 'password'],
  additionalProperties: false,
};

const loginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

module.exports = { signupSchema, loginSchema };
