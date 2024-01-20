import fs from "fs/promises";
import path from "path";
import {
  getCount,
  getAuthorsPage,
  getAuthorByIDFromDB,
  createAuthorInDB,
  updateAuthorInDB,
} from "./authorDB.js";

const getAuthors = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 10;

    if (isNaN(page) || isNaN(perPage) || page <= 0 || perPage <= 0) {
      console.error("Valores de página no válidos");
      return res.status(400).json({ error: "Valores de página no válidos" });
    }

    const startIndex = (page - 1) * perPage;
    const authors = await getAuthorsPage(startIndex, perPage);
    const totalAuthors = await getCount();

    return res.status(200).json({ authors, totalAuthors });
  } catch (error) {
    console.error("Error al obtener autores:", error);
    res.status(500).json({ error: "No se pudieron obtener los autores" });
  }
}

const getCountOfAuthors = async (req, res) => {
  try {
    const count = await getCount();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error al obtener la cuenta total de autores:", error.message);
    res
      .status(500)
      .json({ error: "No se pudo obtener la cuenta total de autores" });
  };
};

const getAuthorByID = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await getAuthorByIDFromDB(id);
    res.status(200).json(author);
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

    if (existingImagePath && existingImagePath !== "no-pic.jpg") {
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
  getCountOfAuthors,
  getAuthorByID,
  createAuthor,
  deleteAuthor,
  updateAuthor,
};
