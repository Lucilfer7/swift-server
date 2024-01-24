import express from 'express';
import { getBooks, getBookByISBN, createBook, updateBook, deleteBook } from '../controllers/books/books.controller';

const booksRouter = express.Router();

booksRouter.get('/books', getBooks);
booksRouter.get('/books/:isbn', getBookByISBN);
booksRouter.post('/books', createBook);
booksRouter.put('/books/:isbn', updateBook);
booksRouter.delete('/books/:isbn', deleteBook);

export default booksRouter;
