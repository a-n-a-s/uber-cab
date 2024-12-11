const userModel = require("../models/user.model");
const userService = require("../service/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackList.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlready = await userModel.findOne({ email });

  if (isUserAlready) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = userModel.generateAuthToken();
  token
    .then((token) => {
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          firstname: user.fullname.firstname,
          lastname: user.fullname.lastname,
          email: user.email,
        },
        token: token,
      });
    })
    .catch((error) => {
      // Handle error, e.g., send an error response
      res.status(500).json({ error: "Token generation failed" });
    });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 3600000,
  });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await userModel.comparePassword(user.password, password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = userModel.generateAuthToken();

  res.status(200).json({
    user,
    token,
  });

  //res.cookie("token", token);
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.json({ message: "Logged out successfully" });
};
