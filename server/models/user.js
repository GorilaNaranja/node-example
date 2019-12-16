const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let roles = {
  values: ["USER_ROLE", "ADMIN_ROLE"],
  message: "{VALUE} is not a valid role"
};

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: roles
  },
  language: [
    {
      type: Schema.Types.ObjectId,
      ref: "Language",
      default: []
    }
  ]
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
