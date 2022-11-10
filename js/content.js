const searchResultsContainer = document.getElementById('search-results-container')
const currentlyReadingContainer = document.getElementById('currently-reading-container')
const toBeReadContainer = document.getElementById('to-be-read-container')
const previouslyReadContainer = document.getElementById('previously-read-container')

function displaySearchResults(books) {
  clearContainers(searchResultsContainer)
  books.forEach(book => {
    createSearchResult(book.volumeInfo)
  })
}

function clearContainers(parents) {
  parents.forEach(parent => {
    while(parent.firstChild) parent.removeChild(parent.firstChild)
  })
}

function createSearchResult(book) {
  book = new Book(book.title, book.authors, book.imageLinks.thumbnail, 'to be read')
  let searchItemContainer = document.createElement('div')
  searchItemContainer.classList.add('search-item-container')
  searchItemContainer.onclick = () => {
    addBookToLibrary(book)
  }
  createTextElement('p', book.title, 'search-item-title', searchItemContainer)
  createTextElement('p', book.authors.join(', '), 'search-item-author', searchItemContainer)
  searchResultsContainer.appendChild(searchItemContainer)
}

function createTextElement(type, text, className, parent) {
  let p = document.createElement(type)
  p.classList.add(className)
  p.innerText = text
  parent.appendChild(p)
}

function displayLibrary() {
  clearContainers([currentlyReadingContainer, toBeReadContainer, previouslyReadContainer])
  library.forEach(book => {
    let bookCard = document.createElement('div')
    bookCard.classList.add('book-card')

    let thumbnail = document.createElement('div')
    thumbnail.classList.add('book-card-thumbnail')
    thumbnail.style.background = 'url(' + book.thumbnail + ')'
    bookCard.appendChild(thumbnail)

    createTextElement('p', book.title, 'book-card-title', bookCard)
    createTextElement('p', book.authors.join(', '), 'book-card-authors', bookCard)
  })
}