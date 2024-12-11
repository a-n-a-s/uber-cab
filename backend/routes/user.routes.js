const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const middleware = require("../middleware/auth.middlewre");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name should be atleast 3 cahrecters"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],

  userController.loginUser
);

router.get("/profile", middleware.authUser, userController.getUserProfile);

router.get("/logout", middleware.authUser, userController.getUserProfile);

module.exports = router;
