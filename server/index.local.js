"use strict";
exports.__esModule = true;
require("dotenv").config();
var app_1 = require("./app/app");
var port = 9000;
app_1["default"].listen(port, function () { return console.log("Listening on port " + port); });
