interface IBook {
  title: string,
  description: string,
  authors: string,
  favorite: string,
  fileCover: string,
  fileName: string,
  fileBook: string,
  id: string
}

class Book implements IBook {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
  id: string;

  constructor(
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileName: string,
    fileBook: string,
    id: string
  ) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

module.exports = Book;