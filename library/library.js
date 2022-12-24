class Library {
  constructor() {
    this.books = []
  }
  addBook(book) {
    this.books.push(book)
  }
  getBooks() {
    return this.books
  }
}

let library = new Library()