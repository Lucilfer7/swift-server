import { pool } from "../../db.js";

const getPublisherInDB = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM publisher");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  };
};

const getPublisherByIDFromDB = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM publisher WHERE PublisherID = ${id}`
    );
    return rows[0];
  } catch (error) {
    throw error;
  };
};

const createPublisherInDB = async (publisherData) => {
  console.log(publisherData);
  try {
    const [rows] = await pool.query(
      `INSERT INTO publisher SET ?`,
      publisherData
    );
    return rows;
  } catch (error) {
    console.error("Error al insertar la editorial:", error);
    return res.status(500).json({ error: "No se pudo crear la editorial" });
  }
};

const updatePublisherInDB = async (publisherData, publisherID) => {
  try {
    const connection = await pool.getConnection();
    const query = `UPDATE publisher SET ? WHERE PublisherID = ?`;
    const [result] = await connection.query(query, [publisherData, publisherID]);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  };
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
