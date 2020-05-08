const mogoose = require("mongoose");
const Schema = mogoose.Schema;
const subject = require("../Category/subject");

const categorySchema = new Schema({
    name: String
})

categorySchema.pre('remove', function(next) {
    subject.find({category: (id)}).exec();
    next();
});

module.exports = mogoose.model("Category", categorySchema);