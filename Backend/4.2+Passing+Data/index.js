import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var title;

app.get("/", (req, res) => {
  title = "Type your name below:";
  res.render("index.ejs", {
    title: title
  });
});

app.post("/submit", (req, res) => {
  console.log((req.body.fName + req.body.lName).lenght);
  const letters = req.body["fName"].lenght + req.body["lName"].lenght;
  title = `Your name has ${letters} letters`;
  res.render("index.ejs", {title})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
