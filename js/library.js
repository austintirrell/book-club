class Library {
  constructor() {
    this.books = []
  }
  addBook(book) {
    this.books.push(book)
    saveData()
  }
  removeBook(book) {
    let index = this.books.findIndex((obj) => obj.id == book.id)
    this.books.splice(index)
    saveData()
  }
}

class Book {
  constructor(id, title, author, readStatus, image) {
    this.id = id
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.image = image
  }
  setReadStatus(status) {
    this.readStatus = status
    saveData()
  }
}

let library = new Library()