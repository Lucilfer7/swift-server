import { pool } from "../../db.js";

const getAuthorsFromDB = async (startIndex, perPage) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM Author");
        connection.release();
        return rows;
    } catch (error) {
        throw error;
    };
};

const getAuthorByIDFromDB = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Author WHERE AuthorID = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        throw error;
    };
};


const createAuthorInDB = async (authorData) => {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            `INSERT INTO Author SET ?`,
            authorData
        );
        console.log('Resultado de la inserción:', result);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    };
};

const updateAuthorInDB = async (authorData, authorID) => {
    try {
        const connection = await pool.getConnection();
        const query = `UPDATE Author SET ? WHERE AuthorID = ?`;
        const [result] = await connection.query(query, [authorData, authorID]);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    };
};

export {
    getAuthorByIDFromDB,
    getAuthorsFromDB,
    createAuthorInDB,
    updateAuthorInDB,
};
