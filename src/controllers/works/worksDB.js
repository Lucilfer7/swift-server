import { pool } from "../../db.js";

const getWorksListQuery = 'SELECT * FROM Works';
const getWorksFullInfoQuery = 'SELECT * FROM WorksAuthorView WHERE WorkID = ?';
const getWorkByIDQuery = 'SELECT * FROM Works WHERE WorkID = ?';
const createWorksQuery = 'INSERT INTO Works SET ?';
const updateWorksQuery = 'UPDATE Works SET ? WHERE WorkID = ?';
const connectWorkToAuthorQuery = `
    INSERT INTO Works_Author (WorkID, AuthorID, RoleID)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
        RoleID = VALUES(RoleID);
`;
const getRolesQuery = 'SELECT * FROM Role';
const deleteWorksQuery = 'DELETE FROM Works WHERE WorkID = ?';

const getWorksList = async () => {
    try {
        const [rows] = await pool.query(getWorksListQuery);
        return rows;
    } catch (error) {
        throw error;
    };
};

const getWorkFullInfoFromDB = async (workID) => {
    try {
        const [rows] = await pool.query(getWorksFullInfoQuery, [workID]);
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
    };
};

const createWorkInDB = async (workData) => {
    try {
        const [result] = await pool.query(createWorksQuery, [workData]);
        return result;
    } catch (error) {
        throw error;
    };
};

const updateWorkInDB = async (workData, workID) => {
    try {
        const [result] = await pool.query(updateWorksQuery, [workData, workID]);
        return result;
    } catch (error) {
        throw error;
    };
};

const deleteWorkInDB = async (workID) => {
    try {
        const [result] = await pool.query(deleteWorksQuery, [workID]);
        return result;
    } catch (error) {
        throw error;
    };
};

const connectWorkToAuthorInDB = async (authorWorksRoleData) => {
    try {
        const [result] = await pool.query(connectWorkToAuthorQuery, [authorWorksRoleData]);
        return result;
    } catch (error) {
        throw error;
    };
};

const getRolesInDB = async () => {
    try {
        const [rows] = await pool.query(getRolesQuery);
        return rows;
    } catch (error) {
        throw error;
    };
};

export { getWorksList, getWorkByIDFromDB, createWorkInDB, updateWorkInDB, deleteWorkInDB, getRolesInDB, connectWorkToAuthorInDB, getWorkFullInfoFromDB };
