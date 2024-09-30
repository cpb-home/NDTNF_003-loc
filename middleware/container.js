const BookRepository = require('../classes/BooksRepository');

const container = {
  BookRepository: BookRepository,
  get(repoName) {
    return new repoName;
  }
}

// container.bind(BooksRepository).toSelf()
container.bind(BookRepository).toSelf();

module.exports = container;