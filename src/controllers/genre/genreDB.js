import { pool } from "../../db.js"

const getGenresInDB = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM Genre");
        connection.release();
        return rows;
    } catch (error) {
        throw error;
    }
};

const getGenreByIDFromDB = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Genre WHERE GenreID = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        throw error;
    };
};

const createGenreInDB = async (genreData) => {
    try {
        const [rows] = await pool.query(
            `INSERT INTO Genre SET ?`,
            genreData
        );
        return rows;
    } catch (error) {
        console.error("Error al insertar el género:", error);
        throw error;
    };
};

const updateGenreInDB = async (Name, id) => {
    try {
        const connection = await pool.getConnection();
        const query = `UPDATE genre SET GenreName = ? WHERE GenreID = ?`;
        const [result] = await connection.query(query, [Name, id]);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    };
};

const deleteGenreInDB = async (id) => {
    try {
        const connection = await pool.getConnection();
        const query = `DELETE FROM Genre WHERE GenreID = ?`
        const [result] = await connection.query(query, [id]);
        connection.release();
        return result
    } catch (error) {
        throw error;
    }
};

export {
    getGenresInDB,
    getGenreByIDFromDB,
    createGenreInDB,
    updateGenreInDB,
    deleteGenreInDB,
};