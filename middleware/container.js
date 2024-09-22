const Book = require('../classes/Book');
const BookRepository = reqire('../classes/BooksRepository');

const container = {
  Book: new Book,
  BookRepository: new BookRepository
}

const bookRepository = container.BookRepository;