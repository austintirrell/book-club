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
  if (innerText) element.innerHTML = innerText
  if (parent) parent.appendChild(element)
  return element
}

let clearContainer = (container) => {
  while (container.firstChild) container.removeChild(container.firstChild)
}

let displayResults = (results) => {
  clearContainer(resultsContainer)
  results.forEach(result => {
    let resultCard = createElement('div', 'result-card', resultsContainer)
    createElement('p', 'result-card-title', resultCard, result.volumeInfo.title)
    createElement('p', 'result-card-author', resultCard, result.volumeInfo.authors)
    resultCard.onclick = () => {
      library.addBook(new Book(result.id, result.volumeInfo.title, result.volumeInfo.authors, 'up next', result.volumeInfo.imageLinks.thumbnail))
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
    // FIND PARENT CONTAINER
    let bookContainer = null
    if (book.readStatus == 'currently reading') bookContainer = currentlyReadingContainer
    else if (book.readStatus == 'up next') bookContainer = upNextContainer
    else if (book.readStatus == 'previously read') bookContainer = previouslyReadContainer

    // BOOK INFO DISPLAY
    let bookCard = createElement('div', 'book-card', bookContainer)
    let bookDisplay = createElement('div', 'book-card-display-container', bookCard)
    let bookImage = createElement('img', 'book-card-image', bookDisplay)
    let bookTextContainer = createElement('div', 'book-card-text-container', bookDisplay)
    bookImage.style.backgroundImage = `url(${book.image})`
    createElement('p', 'book-card-title', bookTextContainer, book.title)
    createElement('p', 'book-card-author', bookTextContainer, book.author)

    // BOOK OPTIONS
    let optionContainer = createElement('div', 'book-card-option-container', bookCard)
    let selectReadStatus = createElement('select', 'book-card-read-status-select', optionContainer,
      `<option value="currently reading">Currently Reading</option>
    <option value="up next">Up Next</option>
    <option value="previously read">Previously Read</option>`)
    selectReadStatus.value = book.readStatus
    selectReadStatus.onchange = () => {
      book.setReadStatus(selectReadStatus.value)
      displayLibrary()
    }
    let deleteButton = createElement('div', 'book-card-delete-button', optionContainer, '<i class="fa-solid fa-trash-can"></i>')
    deleteButton.onclick = () => {
      library.removeBook(book)
      displayLibrary()
    }
    let optionToggle = createElement('div', 'book-option-toggle', bookCard, '<i class="fa-solid fa-caret-left"></i>')
    optionToggle.onclick = () => {
      optionContainer.classList.toggle('active')
      optionToggle.classList.toggle('active')
    }
  })
}

window.onload = () => displayLibrary()