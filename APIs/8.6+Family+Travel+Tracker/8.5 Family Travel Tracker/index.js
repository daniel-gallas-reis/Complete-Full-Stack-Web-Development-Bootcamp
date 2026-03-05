import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "PrograMming_useR01",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
  {id: 3, name: "Daniel", color: "white"},
];

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  //console.log(result);
  let userss = [];
  result.rows.forEach((user) => {
    userss.push(user);
  });
  //console.log(userss);
  return userss;
}

async function getEspecificUser(id) {
  const result = await db.query(`SELECT * FROM users WHERE id = ${id}`);
  let especificUser = result.rows[0];
  //console.log(especificUser);
  return especificUser;
}

async function checkVisisted(userId) {
  const result = await db.query(`SELECT country_code FROM visited_countries WHERE user_id = ${userId}`);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

let gUsers = [];
let currentUser;

app.get("/", async (req, res) => {
  gUsers = await getUsers();
  if (!currentUser){
    currentUser = gUsers[0];
  }
  const countries = await checkVisisted(currentUser.id);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: gUsers,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    //console.log("aqui olha " + currentUser.id);
    const currentUserId = currentUser.id;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/user", async (req, res) => {
  //console.log("atingiu " + req.body["user"]);

  if (!req.body["user"]){
    res.render("new.ejs");
  }else{
    currentUser = await getEspecificUser(req.body["user"]); 
  //console.log(uUser.id);
  const uCountries = await checkVisisted(currentUser.id);
  //console.log(uCountries);
  res.render("index.ejs", {
    countries: uCountries,
    total: uCountries.length,
    users: gUsers,
    color:currentUser.color,
  })
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  console.log(req.body.name);

  try {
      await db.query(
        "INSERT INTO users (name, color) VALUES ($1, $2)",
        [req.body.name, req.body.color]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
