const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const subjectSchema = new Schema({
    subject: {type:String, require: true},
    topic: {type:String, require: true},
    tutor: {type:String, require: true},
    category: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }
})

module.exports = mogoose.model("Subject", subjectSchema);