import { pool } from "../../db.js"

const getGenresInDB = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM genre");
        connection.release();
        return rows;
    } catch (error) {
        throw error;
    }
};

const getGenreByIDFromDB = async () => {
    // Future code
    return [];
};

const createGenreInDB = async (genreData) => {
    try {
        const [rows] = await pool.query(
            `INSERT INTO genre SET ?`,
            genreData
        );
        return rows;
    } catch (error) {
        console.error("Error al insertar el género:", error);
        return res.status(500).json({ error: "No se pudo crear el género" });
    }
};

const updateGenreInDB = async (Name, id) => {
    try {
        const connection = await pool.getConnection();
        const query = `UPDATE genre SET Name = ? WHERE GenreID = ?`;
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
        const query = `DELETE FROM genre WHERE GenreID = ?`
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