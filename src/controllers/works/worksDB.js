import { pool } from "../../db.js";

const getWorksListQuery = 'SELECT * FROM Works';
const getWorksByAuthorIDQuery = `SELECT * FROM WorksAuthorView WHERE AuthorID = ?`
const getWorkByIDQuery = 'SELECT * FROM Works WHERE WorkID = ?';
const createWorksQuery = 'INSERT INTO Works SET ?';
const updateWorksQuery = 'UPDATE Works SET ? WHERE WorkID = ?';
const deleteWorksQuery = 'DELETE FROM Works WHERE WorkID = ?';

const getWorksList = async () => {
    try {
        const [rows] = await pool.query(getWorksListQuery);
        return rows;
    } catch (error) {
        throw error;
    }
};

const getWorksByAuthorIDFromDB = async (authorID) => {
    try {
        const [rows] = await pool.query(getWorksByAuthorIDQuery, [authorID]);
        return rows;
    } catch (error) {
        throw error;
    };
};

const getWorkByIDFromDB = async (workID) => {
    try {
        const [rows] = await pool.query(getWorkByIDQuery, [workID]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createWorkInDB = async (workData) => {
    try {
        const [result] = await pool.query(createWorksQuery, [workData]);
        return result;
    } catch (error) {
        throw error;
    }
};

const updateWorkInDB = async (workData, workID) => {
    try {
        const [result] = await pool.query(updateWorksQuery, [workData, workID]);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteWorkInDB = async (workID) => {
    try {
        const [result] = await pool.query(deleteWorksQuery, [workID]);
        return result;
    } catch (error) {
        throw error;
    }
};

const connectWorkToAuthorInDB = async (authorWorksRoleData) => {
    try {
        const query = "INSERT INTO Works_Author SET ?";
        const [result] = await pool.query(query, [authorWorksRoleData]);
        return result;
    } catch (error) {
        throw error;
    }
};

const getRolesInDB = async () => {
    try {
        const query = "SELECT * FROM Role";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

export {
    getWorksList,
    getWorksByAuthorIDFromDB,
    getWorkByIDFromDB,
    createWorkInDB,
    updateWorkInDB,
    deleteWorkInDB,
    getRolesInDB,
    connectWorkToAuthorInDB
};
