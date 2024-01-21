import { pool } from "../../db.js";

const getCollectionInDB = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM Collection_Publisher_View");
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error en getCollectionInDB:', error);
        throw error;
    }
};

const getCollectionByIDFromDB = async (collectionID) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Collection_Publisher_View WHERE CollectionID = ?',
            [collectionID]
        );
        return rows[0];
    } catch (error) {
        console.error('Error en getCollectionByIDFromDB:', error);
        throw error;
    }
};


const createCollectionInDB = async (collectionData) => {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            `INSERT INTO Collection SET ?`,
            collectionData
        );
        connection.release();
        return result;
    } catch (error) {
        console.error('Error en createCollectionInDB:', error);
        throw error;
    }
};

const updateCollectionInDB = async (collectionData, collectionID) => {
    try {
        const connection = await pool.getConnection();
        const query = `UPDATE Collection SET ? WHERE CollectionID = ?`;
        const [result] = await connection.query(query, [collectionData, collectionID]);
        connection.release();
        return result;
    } catch (error) {
        console.error('Error en updateCollectionInDB:', error);
        throw error;
    }
};

const deleteCollectionInDB = async (collectionID) => {
    try {
        const connection = await pool.getConnection();
        const query = `DELETE FROM Collection WHERE CollectionID = ?`;
        const [result] = await connection.query(query, [collectionID]);
        connection.release();
        return result;
    } catch (error) {
        console.error('Error en deleteCollectionInDB:', error);
        throw error;
    }
};

export {
    getCollectionInDB,
    getCollectionByIDFromDB,
    createCollectionInDB,
    updateCollectionInDB,
    deleteCollectionInDB
};
