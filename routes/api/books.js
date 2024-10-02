const express = require('express');
const router = express.Router();
const Books = require('../../models/books');
const BooksRepository = require('../../classes/BooksRepository');
const container = require('../../middleware/container');

router.get('/', (req, res) => {
  res.render('index', {
    title: "Главная"
  })
});

router.get('/book', async (req, res) => {
  const repo = container.get(BooksRepository);
  const books = await repo.getBooks();
  console.log('Hello from container');

  res.render('book/index', {
    title: "Библиотека",
    books: books
  })

  /*
  try {
    const books = await Books.find().select('-__v');
    
    res.render('book/index', {
      title: "Библиотека",
      books: books
    })
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
    */
});

router.get('/book/view/:id', async (req, res) => {
  try {
    //const books = await Books.find().select('-__v');
    const repo = container.get(BooksRepository);
    const books = await repo.getBooks();
    const { id } = req.params;
    const idx = books.findIndex(book => book.id === id);

    if (idx === -1) {
      res.redirect('/404');
    } else {
      res.render('book/view', {
        title: "Библиотека",
        book: books[idx]
      })
    }
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
});

router.get('/book/create', (req, res) => {
  res.render('book/create', {
    title: "Библиотека",
    book: {}
  })
});

router.post('/book/create', async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const newBook = {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  };

  try {
    //await newBooks.save();
    const repo = container.get(BooksRepository);
    const addedBook = await repo.createBook(newBook);

    res.redirect('/api/books/book');
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
});

router.get('/book/update/:id', async (req, res) => {
  const { id } = req.params;

  try {
    //const book = await Books.findById(id);
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);

    res.render('book/update', {
      title: 'Библиотека',
      book: book
    })
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
})

router.post('/book/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  
  try {
    //await Books.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName, fileBook});
    const updatingBook = {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    };
    const repo = container.get(BooksRepository);
    const updatedInfo = await repo.updateBook(id, updatingBook);

    res.redirect('/api/books/book/');
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
})

router.post('/book/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    //await Books.findByIdAndDelete(id);
    const repo = container.get(BooksRepository);
    const deletedItem = await repo.deleteBook(id);

    res.redirect('/api/books/book');
  } catch (e) {
    console.log(`Ошибюка роута /: ${e}`);
    res.redirect('/404');
  }
})

router.get('/contacts', (req, res) => {
  res.render('contacts/index', {
    title: 'Контакты'
  })
})

module.exports = router;