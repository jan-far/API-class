const Lesson = require("../models/Category/lesson_sub");
const Category = require("../models/Category/category");
const Subject = require("../models/Category/subject");
const Users = require("../models/user.model")
// const db = require("../config");

//Create a subject lesson
exports.createLesson = (req, res) => {
  // Validate request
  if (!req.body.subject || !req.body.category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a lesson
  const lesson = new lesson({
    topic: req.body.topic,
    tutor: req.body.tutor,
    published: req.body.published ? req.body.published : false
  });

  // Save lesson in the database
  lesson
  .save((err, lesson) =>{ 
    if (req.body.subject) {
      Subject.find(
        {
          name: { $in: req.body.subject}
        },
        (err, subject) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          lesson.subject = subject.map(subject => subject._id);
          lesson.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
                    } 
            })
        });
      }
      if (req.body.user) {
        User.find({
          firstname :{$in: req.body.firstname},
          lastname: {$in: req.body.lastname}
        },
        (err, user) =>{
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          lesson.user = subject.map(subject => subject._id);
          lesson.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({
              message: "lesson scheduled successfully",
              id:lesson._id,
            });
          })
      });
      }
  })
};

//Create a subject lesson
exports.createTut = (req, res) => {
  // Validate request
  if (!req.body.subject) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Lesson
  const lesson = new Lesson({
    subject: req.body.subject,
    topic: req.body.topic,
    student: req.body.student,
    published: req.body.published ? req.body.published : false
  });

  // Save Lesson in the database
  lesson
  .save((err, lesson) =>{ 
    if (req.body.tutor) {
    const id = req.params.id;      
        Users.find(
          {
            _id: id
            // // firstname: { $in: req.body.firstname},
            // // lastname: { $in: req.body.lastname},
            // roles: "user"
          },
          (err, tutor) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            lesson.tutor = tutor.map(user => user._id);
            lesson.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              
              res.status(200).send({
                message: "lesson created successfully",
                id:lesson._id,
              });
        })
        
  });
    }
})
 
};

// creating new subject
exports.createSub = (req, res) => {
  // Validate request
  if (!req.body.subject || !req.body.category || !req.body.tutor) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Subject
  const subject = new Subject({
    subject: req.body.subject,
    topic: req.body.topic,
    tutor: req.body.tutor,
    // published: req.body.published ? req.body.published : false
  });

  // Save Subject in the database
  subject
  .save((err, subject) =>{ 
    if (req.body.category) {
      Category.find(
        {
          name: { $in: req.body.category}
        },
        (err, category) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          subject.category = category.map(category => category._id);
          subject.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            
            res.status(200).send({
              message: "Subject created successfully",
              id:subject._id,
              subject:subject.subject,
              topic: subject.topic,
              category: subject.category

            });
      })
      
});
  }
})
 
};

const getSubjectByCategor = function(categoryId) {
    return Subject.find({ category:categoryId})
      .populate("category", "name -_id")
  }

exports.getSubjectByCategory = (req, res) => {
  const id = req.params.id
  getSubjectByCategor(id)
  };
  
// const getTutorialWithPopulate = function(id) {
//     return Lesson.findById(id).populate("comments");
//   };
  
// add this
// lesson = await getTutorialWithPopulate(lesson._id);
// console.log("\n>> populated Lesson:\n", lesson);

// exports.getTutorialWithPopulate = function(id) {
//   return Lesson.findById(id).populate("Categories");
// };

// const addTutorialToCategory = function(tutorialId, categoryId) {
//   return Lesson.findByIdAndUpdate(
//     tutorialId,
//     { category: categoryId },
//     { new: true, useFindAndModify: false }
//   );
// };

//fiding all users
exports.findUsers = (req, res)=>{
  const firstname= req.query.firstname; 
  var condition = firstname ? { firstname: { $regex: new RegExp(firstname) } } : {};
  
  Users.find(condition)
  .populate("roles", "-_id -__v")
  .then(data =>{
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving tutor."
    });
  });
};

//find tutors by name
exports.findAll_lesson = (req, res) => {
  const tutor = req.query.tutor;
  var condition = tutor ? { tutor: { $regex: new RegExp(tutor), $options: "i" } } : {};
  
  Lesson.find(condition).populate("category")
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.update_sub = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Lesson with id=${id}. Maybe Category was not found!`
        });
      } 
      else res.send({ message: "Lesson was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Subject with id=" + id
      });
    });
};

exports.deleteAll_lesson = (req, res) => {
  Lesson.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount}  users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// deleting all users
exports.deleteAll_User = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount}  users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

const getTutor = async(req, res, next) => {
  try{
    const tutors = await Users.findOne(
      {roles: 'tutor'},
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

















//find all and also search for subject
exports.findAll_Sub = (req, res) => {
  const subject = req.query.subject;
  const mysort = {subject: 1}
  var condition = subject ? { subject: { $regex: new RegExp(subject) } } : {};

  Subject.find(condition).sort(mysort)
  .populate("category", "-_id -__v")
  .then(data => {
    return res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving lessons."
    });
  });
}; 

//find and update a subject
exports.update_sub = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Subject.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Subject with id=${id}. Maybe Category was not found!`
        });
      } 
      else res.send({ message: "Subject was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Subject with id=" + id
      });
    });
};

// finding subjects by category
exports.findSubByCat = (req, res) => {
  const id = req.params.id;
  
  Subject.find({category: (id)}).populate("category", "-__v -_id")
  .then(data => {
    if (!data)
    res.status(404).send({ message: "Not found Category with id " + id });
    else res.send(data);
  })
  .catch(err => {
    res
    .status(500)
    .send({ message: "Error retrieving Category with id=" + id });
  });
};

// Find a subject by id -WORKING
exports.findOneSub = (req, res) => {
  const id = req.params.id;

  Subject.findById(id)
  .populate("category", "-_id -__v")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Subject with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Subject with id=" + id });
    });
};

//Deleting all subject 
exports.deleteAll_subject = (req, res) => {
  Subject.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount}  subject were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all subject."
      });
    });
};

//Deleting one subject
exports.deleteSub = (req, res) => {
  const id = req.params.id;

  Subject.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Subject with id=${id}. Maybe Subject was not found!`
        });
      } else {
        res.send({
          message: "Subject was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subject with id=" + id
      });
    });
};















//find all category
exports.findAll_Cat = (req, res) => {
  Category.find()
  .then(data => {
    return res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// find and update category
exports.update_cat = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update category with id=${id}. Maybe Category was not found!`
        });
      } 
      else res.send({ message: "category was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating category with id=" + id
      });
    });
};

// Deleting one category along with subject
exports.deleteCat = (req, res) => {
  const id = req.params.id;

  Category.remove(id)
    .then(data => {
      if (!data) { 
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Subject was not found!`
        });
      } else {
        res.send({
          message: "Category was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};

// Deleting all category : pry, jss, sss
exports.deleteAll_cat = (req, res) => {
  Category.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount}  Categories were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};