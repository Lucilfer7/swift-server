import {
    getGenresInDB,
    getGenreByIDFromDB,
    createGenreInDB,
    updateGenreInDB,
    deleteGenreInDB,
} from "./genreDB.js";

const getGenreByID = async (req, res) => {
    /*
    getGenreByIDFromDB();
    return res.send("getting genre by ID");
    */
};

const getGenres = async (req, res) => {
    try {
        const genres = await getGenresInDB();
        return res.status(200).json(genres);
    } catch (error) {
        console.error("Error al obtener géneros:", error);
        res.status(500).json({ error: "No se pudieron obtener las géneros" });
    }
};

const createGenre = async (req, res) => {
    const { Name } = req.body;
    const genreData = {
        Name
    };
    try {
        const result = await createGenreInDB(genreData);
        return res.status(200).json({ Name, id: result.insertId });
    } catch (error) {
        console.error("Error al insertar el género:", error.message);
        return res.status(500).json({ error: "No se pudo crear el género" });
    }
};

const updateGenre = async (req, res) => {
    const { Name } = req.query;
    const { id } = req.params;

    try {
        await updateGenreInDB(Name, id);
        res.status(200).send("Genre updated");
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteGenreInDB(id);
        res.status(200).send("Genre deleted");
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

export {
    getGenreByID,
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,
};
