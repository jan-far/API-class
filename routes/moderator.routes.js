const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const cat_controller= require("../controllers/category.controller");
const search = require("../config/search")
// const router = require("express").Router();

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });


// app.get()
app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isTutor],
    controller.TutorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


  

//To create a subject 
app.post(
    "/api/subject/register",
    [authJwt.verifyToken, authJwt.isTutor],
    cat_controller.createSub,
    );







// Get all users
    app.get(
      "/api/users/",
      [authJwt.verifyToken, authJwt.isAdmin],
      cat_controller.findUsers);

// To create subject by Admin
app.post(
    "/api/subject/register",
    [authJwt.verifyToken, authJwt.isAdmin],
    cat_controller.createSub,
    );

    //find and update a subject
app.put(
  "/api/subject/:id", 
  [authJwt.verifyToken, authJwt.isAdmin], 
  cat_controller.update_sub);

//deleting a subject in a category
app.delete(
  "/api/subject/remove/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
   cat_controller.deleteSub);

//find and update category by id
app.put(
  "/api/category/:id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  cat_controller.update_cat);

// removing a category and also along with subject
app.delete(
  "/api/subject/category/drop/:id", 
  [authJwt.verifyToken],
  cat_controller.deleteCat);


//Only admin -deleting all categories
app.delete(
    "/api/categories/drop_all",
    [authJwt.verifyToken, authJwt.isAdmin],
    cat_controller.deleteAll_cat,)
//removing all subject - WORKING  
app.delete(
  "/api/subject/clear_all",
  [authJwt.verifyToken, authJwt.isAdmin],
   cat_controller.deleteAll_subject)







app.get("/api/tutors/", search.findRole);

app.delete("/api/users/remv_all",
[authJwt.verifyToken, authJwt.isAdmin], cat_controller.deleteAll_User);

app.post("/api/register/lesson/:id", cat_controller.createTut);






 
 


 
//find all subject 
app.get("/api/subject/", cat_controller.findAll_Sub);






//finding subject by name
// app.get("/api/category/subject/", cat_controller.findSubByName);









// find all data
// app.get("/api/", cat_controller.findAll);

//retrieve all categories
app.get("/api/lesson", cat_controller.findAll_lesson);
app.delete("/api/lesson/remv_all", cat_controller.deleteAll_lesson);

} 
