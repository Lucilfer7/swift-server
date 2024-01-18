import { getCollectionInDB, createCollectionInDB } from "./collectionDB.js";

const getCollection = async (req, res) => {
  try {
    const collections = await getCollectionInDB();
    return res.status(200).json(collections);
  } catch (error) {
    console.error("Error al obtener colección:", error);
    res.status(500).json({ error: "No se pudieron obtener las colecciones" });
  }
};

const createCollection = async (req, res) => {
  const { name, publisherID } = req.body;

  const collectionData = {
    name,
    publisherID,
  };

  try {
    const [result] = await createCollectionInDB(collectionData);
    return res.status(200).json({ name, publisherID, id: result.insertId });
  } catch (error) {
    console.error("Error al insertar el colección:", error);
    return res.status(500).json({ error: "No se pudo crear la colección" });
  }
};

export { getCollection, createCollection };
