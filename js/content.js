const searchResultsContainer = document.getElementById('search-results-container')

function displaySearchResults(books) {
  clearContainer(searchResultsContainer)
  books.forEach(book => {
    createSearchResult(book)
  })
}

function clearContainer(parent) {
  while(parent.firstChild) parent.removeChild(parent.firstChild)
}

function createSearchResult(book) {
  let searchItemContainer = document.createElement('div')
  searchItemContainer.classList.add('search-item-container')
  let thumbnail = document.createElement('div')
  thumbnail.classList.add('search-item-thumbnail')
  thumbnail.style.background = 'url(' + book.volumeInfo.imageLinks.thumbnail + ')'
  searchItemContainer.appendChild(thumbnail)
  createTextElement('p', book.volumeInfo.title, 'search-item-title', searchItemContainer)
  createTextElement('p', book.volumeInfo.authors.join(', '), 'search-item-author', searchItemContainer)
  searchResultsContainer.appendChild(searchItemContainer)
}

function createTextElement(type, text, className, parent) {
  let p = document.createElement(type)
  p.classList.add(className)
  p.innerText = text
  parent.appendChild(p)
}