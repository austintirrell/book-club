class Book {
  constructor(id, title, author, readStatus) {
    this.id = id
    this.title = title
    this.author = author
    this.readStatus = readStatus
  }
  setReadStatus(status) {
    this.readStatus = status
  }
}