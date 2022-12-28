let saveData = () => {
  localStorage.setItem('books', JSON.stringify(library.books))
}

let restoreData = () => {
  let books = JSON.parse(localStorage.getItem('books'))
  if (books) {
    books.forEach(book => {
      library.addBook(new Book(book.id, book.title, book.author, book.readStatus, book.image))
    })
  }
}

// restoreData()