require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
// const session = require("express-session");
// const passport = require("passport");
// const strategy = require("./strategy");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/../build"));

app.use(bodyParser.json());

//---------------massive connection string------------------------

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(e => console.log(e));

//---------------session to hold store login & cart info-------------------------

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7 * 16 //16 weeks
//     }
//   })
// );

//----------------Passport-----------------

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(strategy);

//----------------Build Info for the Build Folder to catch all-------------------------------

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

//----------------port info---------------------------------

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
