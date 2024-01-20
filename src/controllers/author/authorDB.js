import { pool } from "../../db.js";

const getCount = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS count FROM author"
    );
    connection.release();
    return rows[0].count;
  } catch (error) {
    throw error;
  }
}

const getAuthorsPage = async (startIndex, perPage) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM author LIMIT ?, ?", [
      startIndex,
      parseInt(perPage),
    ]);
    connection.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

const getAuthorByIDFromDB = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM author WHERE AuthorID = ${id}`
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

const createAuthorInDB = async (authorData) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO author SET ?`,
      authorData
    );
    console.log('Resultado de la inserción:', result);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
}

const updateAuthorInDB = async (authorData, authorID) => {
  try {
    const connection = await pool.getConnection();
    const query = `UPDATE author SET ? WHERE AuthorID = ?`;
    const [result] = await connection.query(query, [authorData, authorID]);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  };
};

export {
  getCount,
  getAuthorByIDFromDB,
  getAuthorsPage,
  createAuthorInDB,
  updateAuthorInDB,
};
