// Imports
import express from "express";
import _path from "path";

// Routes
import apiRoutes from "./routes/api";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets the view engine to ejs
app.set("view engine", "ejs");
// Sets the default location of the views to the directory below
app.set("views", _path.join(__dirname, "/public/app/views"));

// Serves the static files in the public directory
app.use(express.static(_path.join(__dirname, "public")));

// / route -> API.js
app.use("/", apiRoutes);

app.listen(3000, () => console.log("AAF Maker has started on port 3000"));
