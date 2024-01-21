import express from 'express';
import { getBooks, getBookByID, createBook, updateBook, deleteBook } from '../controllers/books/books.controller';

const booksRouter = express.Router();

booksRouter.get('/books', getBooks);
booksRouter.get('/books/:bookID', getBookByID);
booksRouter.post('/books', createBook);
booksRouter.put('/books/:bookID', updateBook);
booksRouter.delete('/books/:bookID', deleteBook);

export default booksRouter;
