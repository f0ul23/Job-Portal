const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "check if all the requirements are filled", error });
  }
  next();
};

const companyValidation = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    name: Joi.string().min(4).max(100).required().empty("").messages({
        "string.empty": "Name cannot be empty",
        "any.required": "Name is required",
      }),
    //   email: Joi.string().email().required(),
    //   password: Joi.string().min(4).max(100).required(),
      location: Joi.string().min(4).max(100).required(),
      year: Joi.string().required(),
      type: Joi.string().required(),
      people: Joi.string().required(),
      description: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "check if all the requirements are filled", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "check if all the requirements are filled", error });
  }
  next();
};

const companyLoginValidation = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "check if all the requirements are filled", error });
    }
    next();
  };

const hireValidation = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const schema = Joi.object({
    name: Joi.string().min(4).max(100).required().empty("").messages({
      "string.empty": "Name cannot be empty",
      "any.required": "Name is required",
    }),
    post: Joi.string().min(4).max(100).required().empty("").messages({
      "string.empty": "Post cannot be empty",
      "any.required": "Post is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });
  }
  next();
};

const jobsValidation = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

const searchValidation = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  };

module.exports = {
  signupValidation,
  loginValidation,
  hireValidation,
  jobsValidation,
  companyValidation,
  companyLoginValidation,
  searchValidation
};
