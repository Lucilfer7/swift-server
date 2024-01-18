import { pool } from "../../db.js";

async function getCollectionInDB() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM collection");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createCollectionInDB(collectionData) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO author SET ?`,
      collectionData
    );
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export { getCollectionInDB, createCollectionInDB };
