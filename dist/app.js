"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
// Routes
const api = require("./dist/routes/api.js")(router);
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Sets the view engine to ejs
app.set("view engine", "ejs");
// Sets the default location of the views to the directory below
app.set("views", path_1.default.join(__dirname, "/public/app/views"));
// Serves the static files in the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// / route -> API.js
app.use("/", api);
app.listen(3000, () => console.log("AAF Maker has started on port 3000"));
