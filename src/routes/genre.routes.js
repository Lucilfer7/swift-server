import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

async function getGenres() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM genre");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

router.get("/genre", async (req, res) => {
  try {
    const genres = await getGenres();
    console.log(genres);
    return res.status(200).json(genres);
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    res.status(500).json({ error: "No se pudieron obtener los géneros" });
  }
});

router.post("/genre", async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await pool.query(`INSERT INTO genre SET ?`, {
      name,
    });
    return res.status(200).json({ name, id: result.insertId });
  } catch (error) {
    console.error("Error al insertar el género:", error);
    return res.status(500).json({ error: "No se pudo crear el género" });
  }
});

router.put("/genre", (req, res) => {
  res.send("Updating genres");
});

router.delete("/genre", (req, res) => {
  res.send("Deleting genres");
});

export default router;
