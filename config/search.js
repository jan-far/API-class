const user = require("../models/user.model");
const db = require("../models/index");
const Role = require("../models/role.model")


exports.findTutor = 
getTutor = async(req, res, next) => {
  try{
    const tutors = await user.findOne(
      {roles: {$in:'tutor'}},
      {_id: 1, firstname:1, lastname:1, username:1, email:1},
      {sort: {firstname:1}}
    )
    if (!tutors) {
      return res.status(404).json ("No tutor available at the moment")
    }
    return res.status(200).send({
      message: "Tutor available",
      data: tutors
    })
  }
  catch (err) {
    return next(err);
  }
};


exports.findRole =
getRole = async(req, res, next) => {
  try{
    const tutors = await role.find(
      {roles:'tutor'}
      // {_id: 1, firstname:1, lastname:1, username:1, email:1},
      // {sort: {firstname:1}}
    )
    if (!tutors) {
      return res.status(404).json ("No tutor available at the moment")
    }
    return res.status(200).send({
      message: "Tutor available",
      data: tutors
    })
  }
  catch (err) {
    return next(err);
  }
};


// exports.findRole = (req, res,) => Role.find(
//   {
//     roles: { $in: roles }
//   },
//   (err, roles) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "tutor") {
//         res.send(roles)
//         next();
//         return;
//       }
//     }

//     // if (!tutors) {
//     //         return res.status(404).json ("No tutor available at the moment")
//     //       }

//     res.status(403).send({ message: "Require tutor Role!" });
//     return;
//   }
// );
  
