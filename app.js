const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const getRestaurants = require("./routers/getapi");
const connectDb = require("./db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//env variables
dotenv.config();
app.use(express.json());
connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*

i have not hidden the mongo uris atlas just for reference
for finding restaurants near you make a post request to this url

http://localhost:3000/api/getRes/nearMe

for finding all Restaurants
http://localhost:3000/api/getRes

for adding new Restaurant make a post request
http://localhost:3000/api/getRes

for updating make a patch or put requests
http://localhost:3000/api/getRes/:id(of the restaurant)

for adding more ratings to a restaurant make a post request and give rating
http://localhost:3000/api/getRes/:id(of the restaurant)
 */

app.use("/api/getRes", getRestaurants);
app.listen(3000, (req, res) => {
  console.log("hello world!");
});
