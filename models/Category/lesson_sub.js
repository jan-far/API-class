const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const LessonSchema = new Schema({
    topic: {type:String, require:true},
    student: {type:String},
    subject: {type: String,require: true},
    // category:  [
    //   {
    //     type: mogoose.Schema.Types.ObjectId,
    //     ref: "Categories",
    //     require: true
    //   }
    // ],
    tutor: [{
      type: mogoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    published: Boolean
}, {timestamps: true})

module.exports = mogoose.model("Lesson", LessonSchema);