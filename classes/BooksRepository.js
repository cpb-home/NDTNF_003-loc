const Books = require('../models/books');
const inversify = require('inversify');
require('reflect-metadata');

class BooksRepository {
  async createBook(book) {
    const newBook = new Books({
      title: book.title,
      description: book.description,
      authors: book.authors,
      favorite: book.favorite,
      fileCover: book.fileCover,
      fileName: book.fileName,
      fileBook: book.fileBook
    });

    const addedBook = await Books.create(newBook);
    return addedBook;
  }

  async getBook(id) {
    const book = await Books.findOne({_id: id});
    return book;
  }

  async getBooks() {
    const books = await Books.find().select('-__v');
    return books;
  }

  async updateBook(id, book) {
    const updatedInfo = await Books.findByIdAndUpdate(
      id, {
        title: book.title, 
        description: book.description,
        authors: book.authors,
        favorite: book.favorite,
        fileCover: book.fileCover,
        fileName: book.fileName,
        fileBook: book.fileBook
      }
    );
    return updatedInfo;
  }

  async deleteBook(id) {
    const deleted = await Books.findByIdAndDelete(id);
    return deleted;
  }
}

inversify.decorate(inversify.injectable(), BooksRepository);

module.exports = BooksRepository;