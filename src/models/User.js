const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// pre('save') execute before saving to mongo
userSchema.pre("save", function(next) {
  // used 'function' keyword instead arrow function to make use of 'this' keyword

  // this refers record is editing. eg: user
  const user = this;

  // if user not modified password field return immediately
  if (!user.isModified("password")) {
    return next();
  }

  //if user edited password
  //generate salt first
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    //generate hash with salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // replace password with hash
      user.password = hash;
      next();
    });
  });
});

mongoose.model("User", userSchema);
