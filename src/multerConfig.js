import multer from "multer";
import path from "path";

const authorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/authors");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${path.parse(file.originalname).name
      }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const bookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/books");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${path.parse(file.originalname).name
      }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const worksStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/works");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${path.parse(file.originalname).name
      }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

export const uploadAuthorImage = multer({ storage: authorStorage });
export const uploadBookImage = multer({ storage: bookStorage });
export const uploadWorksImage = multer({ storage: worksStorage });  