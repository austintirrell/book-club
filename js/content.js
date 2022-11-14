const searchResultsContainer = document.getElementById('search-results-container')
const currentlyReadingContainer = document.getElementById('currently-reading-container')
const toBeReadContainer = document.getElementById('to-be-read-container')
const previouslyReadContainer = document.getElementById('previously-read-container')

function displaySearchResults(books) {
  clearContainer(searchResultsContainer)
  books.forEach(book => {
    createSearchResult(book)
  })
}

function clearContainer(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild)
}

function createSearchResult(book) {
  book = new Book(book.id, book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail, 'to be read', [])
  let searchItemContainer = document.createElement('div')
  searchItemContainer.classList.add('search-item-container')
  searchItemContainer.onclick = () => {
    if (library.findIndex((obj) => obj.id == book.id) == -1) {
      addBookToLibrary(book)
      resetSearch()
    } else alert('That book has already been added...')
  }
  createTextElement('p', book.title, 'search-item-title', searchItemContainer)
  if (Array.isArray(book.authors) && book.authors.length > 0) book.authors = book.authors.join(', ')
  createTextElement('p', book.authors, 'search-item-author', searchItemContainer)
  searchResultsContainer.appendChild(searchItemContainer)
}

function resetSearch() {
  clearContainer(searchResultsContainer)
  searchResultsContainer.classList.remove('active')
  searchBar.value = ''
}

function createTextElement(type, text, className, parent) {
  let p = document.createElement(type)
  if (className) p.classList.add(className)
  p.innerText = text
  parent.appendChild(p)
}

function displayLibrary() {
  clearContainer(currentlyReadingContainer)
  clearContainer(toBeReadContainer)
  clearContainer(previouslyReadContainer)
  library.forEach(book => {
    let bookCard = document.createElement('div')
    bookCard.classList.add('book-card')
    bookCard.setAttribute('id', book.id)

    let bookInfoContainer = document.createElement('div')
    bookInfoContainer.classList.add('book-card-info')

    let thumbnail = document.createElement('div')
    thumbnail.classList.add('book-card-thumbnail')
    thumbnail.style.backgroundImage = 'url(' + book.thumbnail + ')'
    bookCard.appendChild(thumbnail)

    bookTextContainer = document.createElement('div')
    bookTextContainer.classList.add('book-text-container')
    createTextElement('p', book.title, 'book-card-title', bookTextContainer)
    createTextElement('p', book.authors, 'book-card-authors', bookTextContainer)
    bookCard.appendChild(bookTextContainer)

    bookInfoContainer.appendChild(thumbnail)
    bookInfoContainer.appendChild(bookTextContainer)
    bookCard.appendChild(bookInfoContainer)

    let buttonContainer = document.createElement('div')
    buttonContainer.classList.add('arrow-container')
    let upArrow = document.createElement('i')
    upArrow.classList.add('fa-solid', 'fa-angle-up')
    upArrow.onclick = () => {
      if (book.status == 'currently reading') book.changeStatus('previously read')
      else if (book.status == 'previously read') book.changeStatus('to be read')
      else if (book.status == 'to be read') book.changeStatus('currently reading')
      displayLibrary()
    }
    buttonContainer.appendChild(upArrow)

    let deleteButton = document.createElement('i')
    deleteButton.classList.add('fa-solid', 'fa-trash-can')
    deleteButton.onclick = () => {
      removeBookFromLibrary(book)
    }
    buttonContainer.appendChild(deleteButton)

    let downArrow = document.createElement('i')
    downArrow.classList.add('fa-solid', 'fa-angle-down')
    downArrow.onclick = () => {
      console.log('down arrow')
      if (book.status == 'currently reading') book.changeStatus('to be read')
      else if (book.status == 'to be read') book.changeStatus('previously read')
      else if (book.status == 'previously read') book.changeStatus('currently reading')
      displayLibrary()
    }
    buttonContainer.appendChild(downArrow)
    bookCard.appendChild(buttonContainer)

    if (book.status == 'currently reading') currentlyReadingContainer.appendChild(bookCard)
    else if (book.status == 'to be read') toBeReadContainer.appendChild(bookCard)
    else if (book.status == 'previously read') previouslyReadContainer.appendChild(bookCard)
  })
}