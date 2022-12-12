const { nanoid } = require('nanoid');
const moment = require('moment');

const books = require('../../storage');
const success = require('../../utils/successResponse');
const fail = require('../../utils/failResponse');
const error = require('../../utils/errorReponse');

function createBooksHandler(request, h) {
  const newBookData = request.payload;
  const { name, pageCount, readPage } = newBookData;

  if (!name) {
    return h
      .response(fail('Gagal menambahkan buku. Mohon isi nama buku'))
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response(fail('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'))
      .code(400);
  }

  if (name && (readPage <= pageCount)) {
    const id = `book-${nanoid(7)}`;
    const date = moment().format('dddd, DD MMMM YYYY');

    books.push({
      ...newBookData,
      id,
      insertedAt: date,
      updatedAt: date,
      finished: readPage === pageCount,
    });

    return h.response(success('Buku berhasil ditambahkan', { bookId: id })).code(201);
  }

  return h.response(error('Buku gagal ditambahkan')).code(500);
}

function getBooksHandler(request) {
  const { reading, finished, name } = request.query;

  let filteredBooks = books;

  if (reading) {
    console.log((''));
    filteredBooks = filteredBooks.filter((book) => book.reading === !!parseInt(reading, 2));
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!parseInt(finished, 2));
  }

  if (name) {
    filteredBooks = filteredBooks
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  return {
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  };
}

function getBookHandler(request, h) {
  const { bookId } = request.params;
  const selectedBook = books.find((book) => book.id === bookId);

  if (selectedBook) {
    return {
      status: 'success',
      data: { book: selectedBook },
    };
  }

  return h.response(fail('Buku tidak ditemukan')).code(404);
}

function editBookHandler(request, h) {
  const { bookId } = request.params;
  const editedBook = request.payload;
  const { name, pageCount, readPage } = editedBook;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (!name) {
    return h
      .response(fail('Gagal memperbarui buku. Mohon isi nama buku'))
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response(fail('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'))
      .code(400);
  }

  if (bookIndex >= 0) {
    books[bookIndex] = {
      ...books[bookIndex],
      ...editedBook,
      updatedAt: moment().format('dddd, DD MMMM YYYY'),
      finished: readPage === pageCount,
    };

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }

  return h.response(fail('Gagal memperbarui buku. Id tidak ditemukan')).code(404);
}

function deleteBookHandler(request, h) {
  const { bookId } = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex >= 0) {
    books.splice(bookIndex, 1);

    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }

  return h.response(fail('Buku gagal dihapus. Id tidak ditemukan')).code(404);
}

module.exports = {
  getBooksHandler,
  createBooksHandler,
  getBookHandler,
  editBookHandler,
  deleteBookHandler,
};
