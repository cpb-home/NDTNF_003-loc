const BookRepository = require('../classes/BooksRepository');
const inversify = require('inversify');
require('reflect-metadata');

const container = new inversify.Container();
container.bind(BookRepository).toSelf();

module.exports = container;