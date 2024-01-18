// db.js
import { pool } from "../../db.js";

async function getCount() {
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

async function getAuthorsPage(startIndex, perPage) {
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

async function getAuthorByIDFromDB(id) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM author WHERE AuthorID = ${id}`
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function createAuthorInDB(authorData) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO author SET ?`,
      authorData
    );
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
}

async function updateAuthorInDB(authorData, authorID) {
  try {
    const connection = await pool.getConnection();
    const query = `UPDATE author SET ? WHERE AuthorID = ?`;
    const [result] = await connection.query(query, [authorData, authorID]);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export {
  getCount,
  getAuthorByIDFromDB,
  getAuthorsPage,
  createAuthorInDB,
  updateAuthorInDB,
};
