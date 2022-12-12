const { nanoid } = require('nanoid');
const moment = require('moment');

const books = require('../../storage');
const successResponse = require('../../utils/successResponse');
const failResponse = require('../../utils/failResponse');
const errorResponse = require('../../utils/errorReponse');

function createBooksHandler(request, h) {
  const newBookData = request.payload;
  const { name, pageCount, readPage } = newBookData;

  if (!name) {
    return h
      .response(failResponse('Gagal menambahkan buku. Mohon isi nama buku'))
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response(failResponse('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'))
      .code(400);
  }

  if (name && (readPage < pageCount)) {
    const id = `book-${nanoid(7)}`;
    const date = moment().format('dddd, DD MMMM YYYY');

    books.push({
      ...newBookData,
      id,
      insertedAt: date,
      updatedAt: date,
      finished: newBookData.pageCount === newBookData.readPage,
    });

    return h.response(successResponse('Buku berhasil ditambahkan', { bookId: id })).code(201);
  }

  return h.response(errorResponse('Buku gagal ditambahkan')).code(500);
}

function getBooksHandler(request, h) {
  const { reading, finished, name } = request.query;

  let filteredBooks = books;

  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.reading === !!parseInt(reading, 2));
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!parseInt(reading, 2));
  }

  if (name) {
    filteredBooks = filteredBooks
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
}

function getBookHandler() {}

function editBookHandler() {}

function deleteBookHandler() {}

module.exports = {
  getBooksHandler,
  createBooksHandler,
  getBookHandler,
  editBookHandler,
  deleteBookHandler,
};
