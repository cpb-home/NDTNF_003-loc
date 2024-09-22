const express = require("express");
const mongoose = require('mongoose');

const PORT = process.env.SERVER_PORT || 3000;
const DB_PORT = process.env.DB_PORT || 'mongodb://root:example@mongo:27017/';
const mainUrl = process.env.MAIN_URL || '/api/books';

const error404 = require('./middleware/404');
const bookFileRouter = require('./routes/api/books');

const app = express();



app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(mainUrl, bookFileRouter);
app.use(error404);

async function start(PORT, DB_PORT) {
  try {
    await mongoose.connect(DB_PORT);
    app.listen(PORT, () => {
      console.log(`Library started at port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start(PORT, DB_PORT);
/*
app.listen(PORT, () => {
  console.log(`Library started at port ${PORT}`);
});

*/


/*
const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 3000;
const mainUrl = process.env.MAIN_URL || '/api/books';

const error404 = require('./middleware/404');
const indexRouter = require('./routes/index');
const bookFileRouter = require('./routes/bookFile');
const contactsRouter = require('./routes/contacts');

const app = express();

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(mainUrl, indexRouter);
app.use(mainUrl, bookFileRouter);
app.use(mainUrl, contactsRouter);
app.use(error404);

app.listen(PORT);
*/