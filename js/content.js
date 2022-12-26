const resultsContainer = document.getElementById('results-container')
const currentlyReadingContainer = document.getElementById('currently-reading-container')
const upNextContainer = document.getElementById('up-next-container')
const previouslyReadContainer = document.getElementById('previously-read-container')
const searchBar = document.getElementById('search-bar')
searchBar.oninput = () => {
  if (searchBar.value == '') {
    resultsContainer.classList.remove('active')
  } else {
    resultsContainer.classList.add('active')
    searchBooks(searchBar.value)
  }
}

let createElement = (type, className, parent, innerText) => {
  let element = document.createElement(type)
  if (className) element.classList.add(className)
  if (innerText) element.innerText = innerText
  if (parent) parent.appendChild(element)
  return element
}

let clearContainer = (container) => {
  while (container.firstChild) container.removeChild(container.firstChild)
}

let displayResults = (results) => {
  clearContainer(resultsContainer)
  results.forEach(result => {
    let book = new Book(result.id, result.volumeInfo.title, result.volumeInfo.authors, 'up next', result.volumeInfo.imageLinks.thumbnail)
    if (Array.isArray(book.author) && book.author.length > 1) book.author = book.author.join(', ')

    let resultCard = createElement('div', 'result-card', resultsContainer)
    createElement('p', 'result-card-title', resultCard, book.title)
    createElement('p', 'result-card-author', resultCard, book.author)
    resultCard.onclick = () => {
      library.addBook(book)
      displayLibrary()
      searchBar.value = ''
      resultsContainer.classList.remove('active')
    }
  })
}

let displayLibrary = () => {
  clearContainer(currentlyReadingContainer)
  clearContainer(upNextContainer)
  clearContainer(previouslyReadContainer)
  library.books.forEach(book => {
    let bookContainer = null
    if (book.readStatus == 'currently reading') bookContainer = currentlyReadingContainer
    else if (book.readStatus == 'up next') bookContainer = upNextContainer
    else if (book.readStatus == 'previously read') bookContainer = previouslyReadContainer

    let bookCard = createElement('div', 'book-card', bookContainer)
    let bookTextContainer = createElement('div', 'book-card-text-container', bookCard)
    let bookImage = createElement('img', 'book-card-image', bookCard)
    bookImage.style.backgroundImage = 'url(' + book.image + ')'
    createElement('p', 'book-card-title', bookTextContainer, book.title)
    createElement('p', 'book-card-author', bookTextContainer, book.author)
  })
}

window.onload = () => displayLibrary()