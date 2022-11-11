let library

function Book(id, title, authors, thumbnail, status) {
  this.id = id
  this.title = title
  this.authors = authors
  this.thumbnail = thumbnail
  this.status = status
  this.changeStatus = (str) => {
    this.status = str
    saveDataLocally()
  }
}

function addBookToLibrary(book) {
  library[library.length] = book
  displayLibrary()
  saveDataLocally()
}

function removeBookFromLibrary(book) {
  let index = library.findIndex((obj) => obj.id == book.id)
  library.splice(index)
  displayLibrary()
  saveDataLocally()
}

function saveDataLocally() {
  localStorage.setItem('books', JSON.stringify(library))
}

function restoreLocalData() {
  if (localStorage.getItem('books')) {
    library = []
    let books = JSON.parse(localStorage.getItem('books'))
    books.forEach(book => {
      library[library.length] = new Book(book.id, book.title, book.authors, book.thumbnail, book.status)
    })
    displayLibrary()
  } else library = []
}

window.onload = () => {
  restoreLocalData()
}