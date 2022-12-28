class Library {
  constructor() {
    this.books = []
  }
  addBook(book) {
    this.books.push(book)
  }
  removeBook(book) {
    let index = this.books.findIndex((obj) => obj.id == book.id)
    this.books.splice(index)
  }
}

class Book {
  constructor(id, title, author, readStatus, image) {
    this.id = id
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.image = image
    this.notes = []
  }
  setReadStatus(status) {
    this.readStatus = status
  }
  addNote(note) {
    this.notes.push(note)
  }
}

class Note {
  constructor(title, notes) {
    this.title = title
    this.notes = notes
  }
  setTitle(title) {
    this.title = title
  }
  setNotes(notes) {
    this.notes = notes
  }
}

let library = new Library()
let exampleBook = new Book('1', 'Example', 'Austin Tirrell', 'currently reading', '../img/githubIcon.png')
exampleBook.addNote(new Note('Chapter 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'))
exampleBook.addNote(new Note('Chapter 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'))
library.addBook(exampleBook)