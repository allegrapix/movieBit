const User = require("../../../models/user");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

// const PasswordComplexity = require('joi-password-complexity');
// TODO: implement pass complexity
async function loginUserController (req, res, next) {
  // validate
  const createUserValidationSchema = Joi.object().keys({
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
    _.pick(body, ["email", "password"]),
    createUserValidationSchema
  );
  if (validationResult.error)
  {
    const { error } = validationResult;
    res.status(403).json({
      isJoi: true,
      createUserErrorMessage: error["details"][0]["message"]
    });
    next(error);
  } else
  {
    try
    {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
      {
        return res.status(400).send({ loginMessage: "Invalid credentials." });
      }

      const passIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passIsValid)
      {
        return res.status(400).send({ loginMesage: "Password not valid." });
      }

      const token = user.generateAuthToken()

      // const token = jwt.sign(
      //   { _id: user._id, username: user.username, email: user.email },
      //   jwtPrivateKey
      // );

      res
        .header('x-auth-token', token)
        .status(200).json({ user });
      next();
    } catch (error)
    {
      res.status(500).send({ AuthError: error });
      next(error);
    }
  }
}

module.exports = loginUserController;
