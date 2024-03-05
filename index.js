const express = require("express");
const mysql = require("mysql");
const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log("server running");
});

app.get("/", (req, res) => {
  res.status(200).send("Root of CS Framework Express API!");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "librarian",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");
});

app.post("/books/:title", (req, res) => {
  const { title } = req.params;
  const query = `INSERT INTO BOOK (TITLE) VALUES ('${title}')`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error saving a book");
    } else {
      res.status(200).send("Book successfully saved");
    }
  });
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM BOOK";
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving books from database");
    } else {
      res.json(result);
    }
  });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM BOOK WHERE ID = ${id}`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving a book from database");
    } else {
      if (result.length) {
        res.json(result[0]);
      } else {
        res.status(404).send("Book not found");
      }
    }
  });
});
