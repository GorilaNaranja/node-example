const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const roles = {
  values: ["USER_ROLE", "ADMIN_ROLE"],
  message: "{VALUE} is not a valid role"
};

const userSchema = new Schema({
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
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
