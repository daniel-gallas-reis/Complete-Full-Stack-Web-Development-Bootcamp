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
  port: 5432
});

db.connect();

let places = [];



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  await getCountries();
  res.render("index.ejs", {countries: places, total: places.length});
});

app.post("/add", async(req, res) => {

  const newCountry = req.body.country;
  const codee = await getCountries(newCountry);
  //const newCountryCode = await db.query("SELECT country_code FROM countries WHERE country name = $1", [newCountry]);
  try {
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [codee]);
  } catch (error) {
    res.render("index.ejs", {error: "Country not found or not exist.", total: places.length, countries: places});
  }
  res.redirect("/");

});

async function getCountries(newCountryName) {
  if(!newCountryName){
    const countries = await db.query("SELECT * FROM visited_countries");
    countries.rows.forEach((country) => {
      places.push(country.country_code);
    });
    console.log(places);
  }else{
    const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [newCountryName]
  );

  if (result.rows.length !== 0) {
    const data = result.rows[0];
    const countryCode = data.country_code;
    console.log(countryCode);
    return countryCode;
  }
  db.end();
}
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
