let library = []

class Book {
  constructor(title, authors, thumbnail, status) {
    this.title = title
    this.authors = authors
    this.thumbnail = thumbnail
    this.status = status
  }
}

function addBookToLibrary(book) {
  library[library.length] = book
  displayLibrary()
}