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