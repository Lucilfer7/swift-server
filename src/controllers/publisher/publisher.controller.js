import {
    getPublisherInDB,
    getPublisherByIDFromDB,
    createPublisherInDB,
    updatePublisherInDB,
    deletePublisherInDB,
} from "./publisherDB.js";

const getPublisherByID = async (req, res) => {
    const id = req.params.id;
    const publisher = await getPublisherByIDFromDB(id);
    return res.status(200).json(publisher);
};

const getPublishers = async (req, res) => {
    try {
        const publishers = await getPublisherInDB();
        return res.status(200).json(publishers);
    } catch (error) {
        console.error("Error al obtener editoriales:", error.message);
        res.status(500).json({ error: "No se pudieron obtener las editoriales" });
    }
};

const createPublisher = async (req, res) => {
    const { name, country } = req.query;
    const publisherData = {
        name,
        country,
    };
    console.log(publisherData);
    try {
        const result = await createPublisherInDB(publisherData);
        throw new Error("mantenimiento");
        return res.status(200).json({ name, country, id: result.insertId });
    } catch (error) {
        console.error("Error al insertar la editorial:", error);
        return res.status(500).json({ error: "No se pudo crear la editorial" });
    }
};

const updatePublisher = async (req, res) => {
    updatePublisherInDB();
    res.send("Updating publishers");
};

const deletePublisher = async (req, res) => {
    deletePublisherInDB();
    res.send("Deleting publishers");
};

export {
    getPublisherByID,
    getPublishers,
    createPublisher,
    updatePublisher,
    deletePublisher,
};
