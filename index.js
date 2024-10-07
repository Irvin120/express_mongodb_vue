const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
// const multer = require("multer");

var CONNECTION_STRING = "mongodb+srv://adminIrvin:YKCTZmwREwBmxDeK@cluster0.il69f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "todoappdb";
// var database;

app.listen(3307, async () => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    database = client.db(DATABASENAME);
    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});








