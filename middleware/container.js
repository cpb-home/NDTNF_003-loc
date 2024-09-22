const BookRepository = reqire('../classes/BooksRepository');

const container = {
  BookRepository: new BookRepository
}

// container.bind(BooksRepository).toSelf()
const bookRepository = container.BookRepository;