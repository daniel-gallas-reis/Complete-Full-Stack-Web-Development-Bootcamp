import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "PrograMming_useR01",
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems() {
  //Get all the items from the database
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  items = result.rows;
}

async function addNewItem(itemTitle) {
  //Add new item from the frontend
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [itemTitle]);
  } catch (error) {
    console.log(error);
  }
}

async function updatedItem(updatedItemId, updatedItemTitle) {
  //Update item title by its id
  try {
    await db.query(`UPDATE items SET title = '${updatedItemTitle}' WHERE id = ${updatedItemId}`);
  } catch (error) {
    console.log(error);
  }  
}

async function deleteItem(deleteItemId) {
  //Delete item using the id
  try {
    await db.query(`DELETE FROM items WHERE id = ${deleteItemId}`);
  } catch (error) {
    console.log(error);
  }  
}

let items = [];

app.get("/", async (req, res) => {
  await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  //items.push({ title: item });
  await addNewItem(item);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedItemId = req.body.updatedItemId;
  const updatedItemTitle = req.body.updatedItemTitle;
  await updatedItem(updatedItemId, updatedItemTitle);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const deleteItemId = req.body.deleteItemId;
  await deleteItem(deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
