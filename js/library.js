let library = []
library[0] = new Book("5wBQEp6ruIAC", "The Pragmatic Programmer", "Andrew Hunt, David Thomas", "http://books.google.com/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", "previously read")
library[0].notes[0] = new Notes('Chapter 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
library[0].notes[1] = new Notes('Chapter 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

function Book(id, title, authors, thumbnail, status) {
  this.id = id
  this.title = title
  this.authors = authors
  this.thumbnail = thumbnail
  this.status = status
  this.notes = []
  this.changeStatus = (str) => {
    this.status = str
    saveDataLocally()
  }
}

function Notes(label, notes) {
  this.label = label
  this.notes = notes
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
      library[library.length] = new Book(book.id, book.title, book.authors, book.thumbnail, book.status, book.notes)
    })
    displayLibrary()
  } else library = []
}

window.onload = () => {
  //restoreLocalData()
  displayLibrary()
}