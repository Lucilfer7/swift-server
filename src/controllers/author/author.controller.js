import fs from "fs/promises";
import path from "path";
import {
    getAuthorsFromDB,
    getAuthorByIDFromDB,
    createAuthorInDB,
    updateAuthorInDB,
    getWorksByAuthorIDFromDB
} from "./authorDB.js";

const getAuthors = async (req, res) => {
    try {
        const authors = await getAuthorsFromDB();
        return res.status(200).json(authors);
    } catch (error) {
        console.error("Error al obtener autores:", error);
        res.status(500).json({ error: "No se pudieron obtener los autores" });
    }
}

const getAuthorByID = async (req, res) => {
    try {
        const id = req.params.id;
        const author = await getAuthorByIDFromDB(id);
        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        const worksList = await getWorksByAuthorIDFromDB(id);
        res.status(200).json({ "Author": author,"Works": worksList });
    } catch (error) {
        console.error("Error al obtener autor:", error.message);
        res.status(500).json({ error: "No se pudo obtener al autor" });
    };
};

const createAuthor = async (req, res) => {
    const { Name, LastName, Description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "Debe proporcionar una imagen" });
    };

    const authorData = {
        Name,
        LastName,
        Description,
        ImagePath: file.filename,
    };

    try {
        const result = await createAuthorInDB(authorData);
        return res.status(200).json({
            AuthorID: result.insertId,
            ...authorData,
        });
    } catch (error) {
        console.error("Error al insertar el autor:", error.message);
        return res.status(500).json({ error: "No se pudo crear el autor" });
    };
};

const updateAuthor = async (req, res) => {
    const { Name, LastName, Description, ImagePath } = req.body;
    let { AuthorID } = req.body;
    AuthorID = parseInt(AuthorID);
    const file = req.file;

    //* Verificar si se proporciona una imagen nueva
    if (file) {
        //* Se proporciona una nueva imagen, eliminar la imagen existente si la hay
        const existingAuthor = await getAuthorByIDFromDB(AuthorID);
        const existingImagePath = existingAuthor.ImagePath;

        if (existingImagePath && existingImagePath !== "no-pic.webp") {
            const pathToDelete = path.join("public/images/authors", existingImagePath);
            try {
                await fs.unlink(pathToDelete);
                console.log(`Imagen previa eliminada: ${pathToDelete}`);
            } catch (error) {
                console.error(
                    `Error al eliminar la imagen previa: ${pathToDelete}`,
                    error.message
                );
            };
        };
    };

    //* Construir el objeto authorData
    const authorData = {
        Name,
        LastName,
        Description,
        ImagePath: file ? file.filename : ImagePath,
    };

    try {
        //* Actualizar el autor en la base de datos
        await updateAuthorInDB(authorData, AuthorID);
        return res.status(200).json("Éxito");
    } catch (error) {
        console.error("Error al actualizar el autor:", error.message);
        return res.status(500).json({ error: "No se pudo actualizar el autor" });
    };
};

const deleteAuthor = async (req, res) => {
    res.send("Deleting author");
};

export {
    getAuthors,
    getAuthorByID,
    createAuthor,
    deleteAuthor,
    updateAuthor,
};
