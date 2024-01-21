// bookDB.js
import { pool } from '../../db'; // Asegúrate de importar la conexión a la base de datos

const getBooksInDB = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM Book');
        return rows;
    } catch (error) {
        throw error;
    }
};

const getBookByIDFromDB = async (bookID) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Book WHERE ISBN = ?', [bookID]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createBookInDB = async (bookData) => {
    try {
        const [result] = await pool.query('INSERT INTO Book SET ?', [bookData]);
        return result;
    } catch (error) {
        throw error;
    }
};

const updateBookInDB = async (bookData, bookID) => {
    try {
        const [result] = await pool.query('UPDATE Book SET ? WHERE ISBN = ?', [bookData, bookID]);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteBookInDB = async (bookID) => {
    try {
        const [result] = await pool.query('DELETE FROM Book WHERE ISBN = ?', [bookID]);
        return result;
    } catch (error) {
        throw error;
    }
};

export { getBooksInDB, getBookByIDFromDB, createBookInDB, updateBookInDB, deleteBookInDB };
