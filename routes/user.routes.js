const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const cat_controller= require("../controllers/category.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/all", controller.allAccess);

  app.get("/api/user", [authJwt.verifyToken], [authJwt.allowIfLoggedin, controller.userBoard]);

  // app.get(
  //   "/api/mod",
  //   [authJwt.verifyToken, authJwt.isTutor],
  //   controller.TutorBoard
  // );

  // app.get(
  //   "/api/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );

  
  app.get("/api/user/:id", authJwt.allowIfLoggedin, cat_controller.findUsers);

  //find a subject in a category
app.get("/api/subject/:id", [authJwt.verifyToken], cat_controller.findOneSub);

  //finding all subject by category
app.get("/api/subject/category/:id", [authJwt.verifyToken], cat_controller.findSubByCat);

//finding all category
app.get("/api/category/", [authJwt.verifyToken], cat_controller.findAll_Cat);

//searcg for all subject, by name
app.get("/api/subject/", [authJwt.verifyToken], cat_controller.findAll_Sub);



};