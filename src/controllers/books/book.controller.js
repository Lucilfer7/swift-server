import { getBooksInDB, getBookByISBNFromDB, createBookInDB, updateBookInDB, deleteBookInDB } from './bookDB';

const getBooks = async (req, res) => {
    try {
        const books = await getBooksInDB();
        return res.json(books);
    } catch (error) {
        console.error('Error in getBooks:', error);
        return res.status(500).json({ error: 'Error fetching books' });
    }
};

const getBookByISBN = async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = await getBookByISBNFromDB(isbn);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json(book);
    } catch (error) {
        console.error('Error in getBookByISBN:', error);
        return res.status(500).json({ error: 'Error fetching the book' });
    }
};

const createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const result = await createBookInDB(bookData);
        return res.json(result);
    } catch (error) {
        console.error('Error in createBook:', error);
        return res.status(500).json({ error: 'Error creating the book' });
    }
};

const updateBook = async (req, res) => {
    const { isbn } = req.params;
    const bookData = req.body;
    try {
        const result = await updateBookInDB(bookData, isbn);
        return res.json(result);
    } catch (error) {
        console.error('Error in updateBook:', error);
        return res.status(500).json({ error: 'Error updating the book' });
    }
};

const deleteBook = async (req, res) => {
    const { isbn } = req.params;
    try {
        const result = await deleteBookInDB(isbn);
        return res.json(result);
    } catch (error) {
        console.error('Error in deleteBook:', error);
        return res.status(500).json({ error: 'Error deleting the book' });
    }
};

export { getBooks, getBookByISBN, createBook, updateBook, deleteBook };
