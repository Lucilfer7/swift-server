import { pool } from "../../db.js";

const getPublisherInDB = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM publisher");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
};

const getPublisherByIDFromDB = async () => {
  return [];
};

const createPublisherInDB = async (publisherData) => {
  console.log(publisherData);
  try {
    /*const [rows] = await pool.query(
      `INSERT INTO publisher SET ?`,
      publisherData
    );
    return rows;
    */
  } catch (error) {
    console.error("Error al insertar la editorial:", error);
    return res.status(500).json({ error: "No se pudo crear la editorial" });
  }
};

const updatePublisherInDB = async () => {
  return [];
};

const deletePublisherInDB = async () => {
  return [];
};

export {
  getPublisherInDB,
  getPublisherByIDFromDB,
  createPublisherInDB,
  updatePublisherInDB,
  deletePublisherInDB,
};
