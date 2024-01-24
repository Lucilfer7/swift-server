import { getWorksList, getWorkByIDFromDB, createWorkInDB, updateWorkInDB, deleteWorkInDB, getRolesInDB, connectWorkToAuthorInDB, getWorkFullInfoFromDB } from './worksDB.js';

const getWorks = async (req, res) => {
    try {
        const worksList = await getWorksList();
        return res.status(200).json(worksList);
    } catch (error) {
        console.error('Error in getWorks:', error);
        return res.status(500).json({ error: 'There was an error fetching the works' });
    }
};

const getWorkByID = async (req, res) => {
    const { workID } = req.params;
    try {
        const work = await getWorkByIDFromDB(workID);
        if (!work) {
            return res.status(404).json({ error: 'The work was not found' });
        };
        return res.json(work);
    } catch (error) {
        console.error('Error in getWorkByID:', error);
        return res.status(500).json({ error: 'There was an error fetching the work' });
    };
};

const createWork = async (req, res) => {
    const { Title, Subtitle, PublishingYear, Description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "You must provide an image" });
    };

    const workData = { Title, Subtitle, PublishingYear, Description, ImagePath: file.filename };

    try {
        const result = await createWorkInDB(workData);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error in createWork:', error);
        return res.status(500).json({ error: 'There was an error creating the work' });
    }
};

const updateWork = async (req, res) => {
    const { workID } = req.params;
    const workData = req.body;
    try {
        const result = await updateWorkInDB(workData, workID);
        return res.json(result);
    } catch (error) {
        console.error('Error in updateWork:', error);
        return res.status(500).json({ error: 'There was an error updating the work' });
    }
};

const deleteWork = async (req, res) => {
    const { workID } = req.params;
    try {
        const result = await deleteWorkInDB(workID);
        return res.json(result);
    } catch (error) {
        console.error('Error in deleteWork:', error);
        return res.status(500).json({ error: 'There was an error deleting the work' });
    }
};

const connectWorkToAuthor = async (req, res) => {
    const { WorkID, authorId, RoleID } = req.body;

    let authorWorkRoleData = { WorkID, AuthorID: authorId, RoleID };

    try {
        const result = await connectWorkToAuthorInDB(authorWorkRoleData);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error in connectWorkToAuthor:', error);
        return res.status(500).json({ error: 'There was an error linking the author to the work' });
    };
};

const getRoles = async (req, res) => {
    try {
        const result = await getRolesInDB();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error getting roles:", error)
        return res.status(500).json({ error: 'There was an error getting the roles' })
    }
};

const getWorkFullInfo = async (req, res) => {
    const { workID } = req.params
    let result;
    try {
        result = await getWorkFullInfoFromDB(workID);
        if (result.length === 0) {
            result = await getWorkByIDFromDB(workID);
        }
        return res.status(200).json(result)
    } catch (error) {
        console.error("Error getting full info from works");
        return res.status(500).json({ error: 'There was an error getting full info from works' })
    };
};

export { getWorks, getWorkByID, createWork, updateWork, deleteWork, connectWorkToAuthor, getRoles, getWorkFullInfo };
