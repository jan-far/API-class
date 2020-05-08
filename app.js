const express = require("express");
const app = express();
// const authRoutes = require("./users/routes/user.routes");
// const mongoose = require("mongoose");
const cors =require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const Role = db.role;
const Category = db.category;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.listen(3001) 

// mongoose
//   .connect(
//     "mongodb://janfar:farouk@cluster0-shard-00-00-env6i.mongodb.net:27017,cluster0-shard-00-01-env6i.mongodb.net:27017,cluster0-shard-00-02-env6i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(result => {
//     console.log("Database connected");
//     app.listen(3001);
//   })
//   .catch(err => console.log(err));


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/moderator.routes')(app);

db.mongoose
.connect(
  "mongodb://janfar:farouk@cluster0-shard-00-00-env6i.mongodb.net:27017,cluster0-shard-00-01-env6i.mongodb.net:27017,cluster0-shard-00-02-env6i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "tutor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'tutor' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Category({
        name: "primary"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Primary' to category collection");
      });

      new Category({
        name: "jss"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Jss' to category collection");
      });

      new Category({
        name: "sss"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Sss' to category collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to janfar application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
