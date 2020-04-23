
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");


const app = express();
const router = express.Router();
const port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname ,"public")));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

const indexPage = require("./controllers/indexRoute.js");
const getPricePage = require("./controllers/getPriceRoute.js");
const errorPage = require("./controllers/errorRoute.js");

app.use("/getPrice", getPricePage);
app.use("/error", errorPage);
app.use("/", indexPage);


app.listen(port, () => console.log(`Tuned In and Turned On to port ${port}`));