const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Minimum 3 charecters required"],
    },
    lastname: {
      type: String,
      minlength: [3, "Minimin 3 charecters required"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },
});

userSchema.statics.generateAuthToken =  function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  console.log(this._id)
  return token;
};
userSchema.statics.comparePassword = async function (user_password, password) {
  return await bcrypt.compare(password, user_password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
