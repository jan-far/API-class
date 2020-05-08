const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    firstname: {type: String, require:true},
    lastname: {type: String, require:true},
    username: {type: String, require:true},
    email: {type: String, require:true},
    password: {type: String, require:true},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  }, {timestamps:true});

  userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
  });


module.exports = mongoose.model("User", userSchema);