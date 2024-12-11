const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require('../models/blackList.model');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //const token =  req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "You are not authorized!" });
  }
  
  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
    const user = await userModel.findById(decoded.iat);
    req.user = user;
    console.log(user);

    return next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid!" ,error});
  }
};
