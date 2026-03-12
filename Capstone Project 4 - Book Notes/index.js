import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "notebook",
  password: "PrograMming_useR01",
  port: 5432
});
db.connect();

let books = [];
let currentBook;
let cardBook1;
let cardBook2;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getBooks(order) {
  //Get all information from the database to format the homepage
  //order 1 - by id; 2 - by rating; 3 - by recency and 4 - by title
  let result;
  switch (order) {
    case 1:
      result = await db.query("SELECT * FROM books ORDER BY id ASC");
      break;
    case 2:
      result = await db.query("SELECT * FROM books ORDER BY rate DESC");
      break;
    case 3:
      result = await db.query("SELECT * FROM books ORDER BY date ASC");
      break;
    case 4:
      result = await db.query("SELECT * FROM books ORDER BY title ASC");
    default:
      break;
  }
  books = result.rows;
}

async function getEspecificBook(bookId) {
  const result = await db.query(`SELECT * FROM books WHERE id = ${bookId}`);
  let especificBook = result.rows[0];
  return especificBook;
}

async function saveNewBookNotes(params) {
  const today = new Date();
  try {
    await db.query("INSERT INTO books (author, title, category, isbn, rate, notes, date) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
      [params.author, params.title, params.category, params.isbn, params.rate, params.notes, today]);
  } catch (error) {
  }
}

async function saveEditedBookNotes(params) {
  try {
    await db.query(`UPDATE books SET author = '${params.author}', notes = '${params.notes}', title = '${params.title}', category = '${params.category}', isbn = '${params.isbn}', rate = ${parseInt(params.rate)} WHERE id = ${parseInt(editingBook)}`);
  } catch (error) {
    console.log(error);
  }
}

async function deleteBook(deletedBookId) {
  try {
    await db.query("DELETE FROM books WHERE id = $1", [deletedBookId]);
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async (req, res) => {
  let orderBook;
  if (!req.query.orderId) {
    orderBook = 1;
  } else {
    orderBook = parseInt(req.query.orderId);
  }
  await getBooks(orderBook);
  const randomBook1 = Math.floor(Math.random() * books.length);
  let randomBook2 = Math.floor(Math.random() * books.length);
  cardBook1 = books[randomBook1];
  if (randomBook1 == randomBook2) {
    randomBook2 = Math.floor(Math.random() * books.length);
    cardBook2 = books[randomBook2];
  } else {
    cardBook2 = books[randomBook2];
  }
  res.render("index.ejs", {
    listBooks: books,
    firstCardBook: cardBook1,
    secondCardBook: cardBook2,
    currentBook: books[0]
  });
});

app.post("/book", async (req, res) => {
  currentBook = await getEspecificBook(req.body.selectedBookId);
  res.render("index.ejs", {
    listBooks: books,
    firstCardBook: cardBook1,
    secondCardBook: cardBook2,
    currentBook: currentBook
  });
});

app.post("/add", (req, res) => {
  res.render("new.ejs");
});

app.post("/save", async (req, res) => {
  await saveNewBookNotes(req.body);
  res.redirect("/");
});

app.post("/saveEdit", async (req, res) => {
  await saveEditedBookNotes(req.body);
  res.redirect("/");
});

let editingBook;

app.post("/edit", async (req, res) => {
  editingBook = req.body.editedBookId;
  const editBook = await getEspecificBook(parseInt(req.body.editedBookId));
  res.render("new.ejs", {
    editedBook: editBook
  });
});

app.post("/delete", async (req, res) => {
  await deleteBook(parseInt(req.body.deletedBookId));
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
