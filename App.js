// Imports
const express = require("express"),
      app = express(),
      expressValidator = require("express-validator"),
      router = express.Router();

const fs = require("fs"),
      _path = require("path");

// Routes
const API = require("./Routes/API.js")(Router);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Sets the view engine to ejs
app.set("view engine", "ejs");
// Sets the default location of the views to the directory below
app.set("views", _path.join(__dirname + "/Public/App/Views"));

// Serves the static files in the Public directory
app.use(express.static("Public"));

// / route -> API.js
app.use("/", API);

app.listen(3000, () => console.log("AAF Maker has started on port 3000"));
