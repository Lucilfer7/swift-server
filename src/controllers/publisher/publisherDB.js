import { pool } from "../../db.js";

const getPublisherInDB = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM Publisher");
        connection.release();
        return rows;
    } catch (error) {
        throw error;
    }
};

const getPublisherByIDFromDB = async (id) => {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM Publisher WHERE PublisherID = ${id}`
        );
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createPublisherInDB = async (publisherData) => {
    try {
        const [rows] = await pool.query(
            `INSERT INTO Publisher SET ?`,
            publisherData
        );
        return rows;
    } catch (error) {
        console.error("Error al insertar la editorial:", error);
        throw error;  // Re-lanza el error después de imprimirlo
    }
};

const updatePublisherInDB = async (publisherData, publisherID) => {
    try {
        const connection = await pool.getConnection();
        const query = `UPDATE Publisher SET ? WHERE PublisherID = ?`;
        const [result] = await connection.query(query, [publisherData, publisherID]);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

const deletePublisherInDB = async (publisherID) => {
    try {
        const connection = await pool.getConnection();
        const query = `DELETE FROM Publisher WHERE PublisherID = ?`;
        const [result] = await connection.query(query, [publisherID]);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

export {
    getPublisherInDB,
    getPublisherByIDFromDB,
    createPublisherInDB,
    updatePublisherInDB,
    deletePublisherInDB,
};
