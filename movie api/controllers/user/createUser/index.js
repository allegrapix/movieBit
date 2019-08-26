const User = require("../../../models/user");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

// const PasswordComplexity = require('joi-password-complexity');
// TODO: implement pass complexity
async function createUserController (req, res, next) {
  // validate
  const createUserValidationSchema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(66)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .min(5)
      .max(60)
      .required(),
    password: Joi.string()
      .min(6)
      .max(1000)
      .required()
  });
  const { body } = req;
  const validationResult = Joi.validate(
    _.pick(body, [
      "_id",
      "username",
      "email",
      "password"
    ]),
    createUserValidationSchema
  );
  if (validationResult.error)
  {
    const { error } = validationResult;
    res.status(403).json({
      createUserErrorMessage: {
        isJoi: true,
        createUserErrorMessage: error["details"][0]["message"]
      }
    });
    next(error);
  } else
  {
    try
    {
      const salt = await bcrypt.genSalt(10);//ge string 1 way
      const hash = await bcrypt.hash(validationResult.value.password, salt);

      const user = new User({
        ...validationResult.value,
        isGold: false,
        stars: 0,
        password: hash
      });
      const savedUser = await user.save();
      const token = savedUser.generateAuthToken()
      res
        .header('x-auth-token', token)
        .status(200)
        .json({
          CREATE_USER_PAYLOAD: _.pick(savedUser, [
            "_id", "username", "email"
          ])
        });
      next();
    } catch (error)
    {
      let uniqErr =
        error.code === 11000
          ? "Username / email / phone number already in use. Values must be unique."
          : null;
      res.status(403).send({
        isJoi: false,
        driver: true,
        createUserErrorMessage:
          uniqErr || "Can't create user with provided data.",
        error
      });
      next(error);
    }
  }
}

module.exports = createUserController;
