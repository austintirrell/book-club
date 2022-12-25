class Library {
  constructor() {
    this.books = []
  }
  addBook(book) {
    this.books.push(book)
  }
}

class Book {
  constructor(id, title, author, readStatus, preview) {
    this.id = id
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.preview = preview
  }
  setReadStatus(status) {
    this.readStatus = status
  }
}

let library = new Library()

let bookExample = new Book("5wBQEp6ruIAC", "The Pragmatic Programmer", ["Andrew Hunt", "David Thomas"], "currently reading", "http://books.google.com/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")

library.addBook(bookExample)