let library = []

function Book(id, title, authors, thumbnail, status) {
  this.id = id
  this.title = title
  this.authors = authors
  this.thumbnail = thumbnail
  this.status = status
  this.changeStatus = (str) => {
    this.status = str
  }
}

function addBookToLibrary(book) {
  library[library.length] = book
  displayLibrary()
}