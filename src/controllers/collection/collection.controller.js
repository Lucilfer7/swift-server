import { getCollectionInDB, createCollectionInDB } from "./collectionDB.js";

const getCollection = async (req, res) => {
  try {
    const collections = await getCollectionInDB();
    return res.status(200).json(collections);
  } catch (error) {
    console.error("Error al obtener colección:", error.message);
    res.status(500).json({ error: "No se pudieron obtener las colecciones" });
  };
};

const getCollectionByID = async (req, res) => {

}

const createCollection = async (req, res) => {
  const { Name, publisherID } = req.body;

  const collectionData = {
    Name,
    PublisherID: publisherID,
  };

  try {
    const result = await createCollectionInDB(collectionData);
    console.log('Resultado de createCollectionInDB:', result);

    // Manejar el resultado según tus necesidades
    return res.status(200).json({ Name, publisherID, id: result.insertId });
  } catch (error) {
    console.error("Error al insertar la colección:", error.message);

    // Puedes manejar casos específicos de error aquí si es necesario

    return res.status(500).json({ error: "No se pudo crear la colección" });
  }
};


export { getCollection, createCollection };
