import { pool } from '../../db';

const getBookQuery = 'SELECT * FROM Book';
const getBookByISBNQuery = 'SELECT * FROM Book WHERE ISBN = ?';
const createBookQuery = 'INSERT INTO Book SET ?';
const updateBookQuery = 'UPDATE Book SET ? WHERE ISBN = ?';
const deleteBookQuery = 'DELETE FROM Book WHERE ISBN = ?';

const getBooksInDB = async () => {
    try {
        const [rows] = await pool.query(getBookQuery);
        return rows;
    } catch (error) {
        throw error;
    };
};

const getBookByISBNFromDB = async (isbn) => {
    try {
        const [rows] = await pool.query(getBookByISBNQuery, [isbn]);
        return rows[0];
    } catch (error) {
        throw error;
    };
};

const createBookInDB = async (bookData) => {
    try {
        const [result] = await pool.query(createBookQuery, [bookData]);
        return result;
    } catch (error) {
        throw error;
    };
};

const updateBookInDB = async (bookData, isbn) => {
    try {
        const [result] = await pool.query(updateBookQuery, [bookData, isbn]);
        return result;
    } catch (error) {
        throw error;
    };
};

const deleteBookInDB = async (isbn) => {
    try {
        const [result] = await pool.query(deleteBookQuery, [isbn]);
        return result;
    } catch (error) {
        throw error;
    };
};

export { getBooksInDB, getBookByISBNFromDB, createBookInDB, updateBookInDB, deleteBookInDB };
