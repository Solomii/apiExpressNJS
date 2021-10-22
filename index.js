require("dotenv").config();
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const express = require('express');
const jsonOffset = 4;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  console.log(readUsers(req.body));
   res.send(200)
});

app.post('/user/new', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  writeUser(req.body)
  res.send(201)
});
 
app.patch('/user/:userId', (req, res) => {
  let userId = parseInt(req.params.userId);
  if (!userId) return res.sendStatus(404);
  editUser(userId, req.body);
  res.send(201);
});
 
app.delete('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  deleteUser(userId)
   res.send(204);
});
 

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});

function readUsers() {
  let jsonData = require("./users.json");
  return JSON.stringify(jsonData, null, jsonOffset);
}

function writeUser(user) {
  let array = new Array();
  array.push(user)
  let data = JSON.stringify(array, null, jsonOffset);
  fs.writeFileSync("./users.json", data);
}

function editUser(id, user) {
  let jsonData = require("./users.json");
  user.id = id;
  let newArray = jsonData.filter((item) => item.id !== id);
  newArray.push(user);
  fs.writeFileSync("./users.json", JSON.stringify(newArray, null, jsonOffset));
}

function deleteUser(userId) {
  let jsonData = require("./users.json");
  let newArray = jsonData.filter((user) => user.id !== userId);
  fs.writeFileSync("./users.json", JSON.stringify(newArray, null, jsonOffset));
}


