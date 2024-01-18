import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

async function getBooks() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM books");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

router.get("/books", async (req, res) => {
  try {
    const books = await getBooks();
    console.log(books);
    return res.status(200).json(books);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ error: "No se pudieron obtener los libros" });
  }
});

router.post("/books", async (req, res) => {
  const {
    ISBN,
    title,
    subtitle,
    description,
    price,
    pages,
    rating,
    publishingYear,
    editionNumber,
    countryPrinted,
    language,
    typeOfCover,
    illustratorID,
    collectionID,
    publisherID,
    coverID,
  } = req.body;
  try {
    const [result] = await pool.query(`INSERT INTO book SET ?`, {
      ISBN,
      title,
      subtitle,
      description,
      price,
      pages,
      rating,
      publishingYear,
      editionNumber,
      countryPrinted,
      language,
      typeOfCover,
      illustratorID,
      collectionID,
      publisherID,
      coverID,
    });
    return res.status(200).json({
      ISBN,
      title,
      subtitle,
      description,
      price,
      pages,
      rating,
      publishingYear,
      editionNumber,
      countryPrinted,
      language,
      typeOfCover,
      illustratorID,
      collectionID,
      publisherID,
      coverID,
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error al insertar el libro:", error);
    return res.status(500).json({ error: "No se pudo crear el libro" });
  }
});

router.put("/books", (req, res) => {
  res.send("Updating books");
});

router.delete("/books", (req, res) => {
  res.send("Deleting book");
});

export default router;
