import multer from "multer";
import path from "path";

const authorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/authors");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${
      path.parse(file.originalname).name
    }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const bookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/books");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${
      path.parse(file.originalname).name
    }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

// Configuración de Multer para autores
export const uploadAuthorImage = multer({ storage: authorStorage });

// Configuración de Multer para libros
export const uploadBookImage = multer({ storage: bookStorage });
