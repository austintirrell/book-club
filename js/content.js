const resultsContainer = document.getElementById('results-container')
const searchBar = document.getElementById('search-bar')
searchBar.oninput = () => searchBooks(searchBar.value)

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
    if (Array.isArray(book.author) && book.author.length > 0) book.author = book.author.join(', ')

    let resultCard = createElement('div', 'result-card', resultsContainer)
    createElement('p', 'result-card-title', resultCard, book.title)
    createElement('p', 'result-card-author', resultCard, book.author)
    resultCard.onclick = () => library.addBook(book)
  })
}