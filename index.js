const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


var CONNECTION_STRING = "mongodb+srv://adminIrvin:YKCTZmwREwBmxDeK@cluster0.il69f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "todoappdb";
var database;

app.listen(3307, async () => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    database = client.db(DATABASENAME);
    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

app.get("/api/todoapp/get", async (req, res) => {
  if (!database) {
    return res.status(500).send("Database connection not established");
  }

  try {
    const datos = await database.collection("todoappcollection").find({}).toArray();
    res.json(datos);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.post("/api/todoapp/addnotes", async (req, res)=>{
    if(!database) {
        return res.status(500).send("Database connection not established");
    }
    try {
        const count = await database.collection("todoappcollection").countDocuments({});
        const obj = { _id: count + 1, name: req.body.name };
        const newDoc = await database.collection("todoappcollection").insertOne(obj);
        res.status(200).send({newDoc})
    } catch (error) {   
    res.status(500).send(error.message);
    }
})