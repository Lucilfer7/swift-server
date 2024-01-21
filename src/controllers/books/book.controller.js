// books.controller.js
import { getBooksInDB, getBookByIDFromDB, createBookInDB, updateBookInDB, deleteBookInDB } from './bookDB';

const getBooks = async (req, res) => {
    try {
        const books = await getBooksInDB();
        return res.json(books);
    } catch (error) {
        console.error('Error en getBooks:', error);
        return res.status(500).json({ error: 'Error al obtener los libros' });
    }
};

const getBookByID = async (req, res) => {
    const { bookID } = req.params;
    try {
        const book = await getBookByIDFromDB(bookID);
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        return res.json(book);
    } catch (error) {
        console.error('Error en getBookByID:', error);
        return res.status(500).json({ error: 'Error al obtener el libro' });
    }
};

const createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const result = await createBookInDB(bookData);
        return res.json(result);
    } catch (error) {
        console.error('Error en createBook:', error);
        return res.status(500).json({ error: 'Error al crear el libro' });
    }
};

const updateBook = async (req, res) => {
    const { bookID } = req.params;
    const bookData = req.body;
    try {
        const result = await updateBookInDB(bookData, bookID);
        return res.json(result);
    } catch (error) {
        console.error('Error en updateBook:', error);
        return res.status(500).json({ error: 'Error al actualizar el libro' });
    }
};

const deleteBook = async (req, res) => {
    const { bookID } = req.params;
    try {
        const result = await deleteBookInDB(bookID);
        return res.json(result);
    } catch (error) {
        console.error('Error en deleteBook:', error);
        return res.status(500).json({ error: 'Error al eliminar el libro' });
    }
};

export { getBooks, getBookByID, createBook, updateBook, deleteBook };
