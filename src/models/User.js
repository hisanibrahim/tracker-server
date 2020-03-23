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

// salting and hashing begins

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

// salting and hashing ends

// compare password method for sign in

userSchema.methods.comparePassword = function(candidatePassword) {
  // this referes current record, eg: user
  const user = this;

  // using Promise to make use of async await while comparing
  return new Promise((resolve, reject) => {
    // compare password
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      // if an error, reject promise with error
      if (err) {
        return reject(err);
      }

      // if no match, reject promise with false
      if (!isMatch) {
        return reject(false);
      }

      // if everything went good resolve promise with true
      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
