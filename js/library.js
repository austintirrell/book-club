let library = []

function Book(id, title, authors, thumbnail, status) {
  this.id = id
  this.title = title
  this.authors = authors
  this.thumbnail = thumbnail
  this.status = status
}

function addBookToLibrary(book) {
  library[library.length] = book
  displayLibrary()
}