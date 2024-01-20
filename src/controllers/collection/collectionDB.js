import { pool } from "../../db.js";

const getCollectionInDB = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM collection_publisher_view");
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

const createCollectionInDB = async (collectionData) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO collection SET ?`,
      collectionData
    );
    connection.release();
    return result;
  } catch (error) {
    console.error('Error en createCollectionInDB:', error);
    throw error; // Re-lanza el error después de imprimirlo
  };
};


export { getCollectionInDB, createCollectionInDB };
