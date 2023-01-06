import { Request, Response } from 'express';

import { FindBooks, SearchBooks } from '@apis/books/books.interface';
import booksService from '@apis/books/books.service';
import { Scrap } from '@apis/scraps/scraps.interface';
import scrapsService from '@apis/scraps/scraps.service';
import { Forbidden, Message } from '@errors';

const getBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const book = await booksService.getBook(+bookId, userId);

  return res.status(200).send(book);
};

const getOwnerBook = async (req: Request, res: Response) => {
  const { title, owner } = req.query as unknown as {
    title: string;
    owner: string;
  };

  const book = await booksService.getOwnerBook({ title, owner });

  return res.status(200).send(book);
};

const getBooks = async (req: Request, res: Response) => {
  const { order, take } = req.query as unknown as FindBooks;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const books = await booksService.getBooks({ order, take: +take, userId });

  return res.status(200).send(books);
};

const searchBooks = async (req: Request, res: Response) => {
  const { query, page, take, isUsers } = req.query as unknown as SearchBooks;

  let userId = res.locals.user?.id;

  if (!userId) userId = 0;

  const searchResult = await booksService.searchBooks({
    query,
    isUsers,
    userId,
    take: +take,
    page,
  });

  return res.status(200).send(searchResult);
};

const createBook = async (req: Request, res: Response) => {
  const { title, thumbnail_image } = req.body;

  if (!title.length) throw new Forbidden(Message.BOOK_INVALID_TITLE);

  const userId = res.locals.user.id;

  const book = await booksService.createBook({ title, thumbnail_image, userId });

  const bookData = await booksService.getBook(book.id, userId);

  return res.status(201).send(bookData);
};

const updateBook = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);
  const { title, thumbnail_image, scraps } = req.body;

  if (!title) throw new Forbidden(Message.BOOK_INVALID_TITLE);

  await Promise.all(scraps.map((scrap: Scrap) => scrapsService.updateScrapOrder(scrap)));

  const updatedBook = await booksService.updateBook({ id: bookId, title, thumbnail_image });

  return res.status(200).send(updatedBook);
};

const deleteBook = async (req: Request, res: Response) => {
  const bookId = Number(req.params.bookId);

  const userId = res.locals.user.id;

  const deletedBook = await booksService.deleteBook(bookId, userId);

  return res.status(200).send(deletedBook);
};

export default {
  getBook,
  getOwnerBook,
  getBooks,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
};
