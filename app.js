const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/firstuser/:id", (req, res) => {
  const id = req.params.id;
  let firstuser = users.find((el) => el.id === parseInt(id));
  res.send(firstuser);
});

app.get("/companyName/:name", (req, res) => {
  const name = req.params.name;
  const userObject = { name }; // Assuming userObject is the new user
  users.push(userObject);
  res.send({ success: true });
});

app.get("/userbycity/:city", (req, res) => {
  const companyName = req.params.city;
  let user = users.filter((item) => item.companyName === companyName);
  res.send(user);
});

app.get("/getStreet/:street", (req, res) => {
  const street = req.params.street;
  const user = users.find((item) => item.id === parseInt(street));
  res.send(user.address.street);
});

app.post("/user_add", (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let newUser = { name, age };
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  const index = users.findIndex((el) => el.id === parseInt(id));
  users[index].email = "newEmail";
  res.send({ success: true });
});

app.delete("/deleteuser/:id", (req, res) => {
  let id = req.params.id;
  users = users.filter((el) => el.id !== parseInt(id));
  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
