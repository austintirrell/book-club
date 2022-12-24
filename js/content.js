const searchResultsContainer = document.getElementById('search-results-container')
const currentlyReadingContainer = document.getElementById('currently-reading-container')
const toBeReadContainer = document.getElementById('to-be-read-container')
const previouslyReadContainer = document.getElementById('previously-read-container')

function createElement(type, className, text, parent) {
  let element = document.createElement(type)
  if (className) element.classList.add(className)
  if (text) element.innerHTML = text
  if (parent) parent.appendChild(element)
  return element
}

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
  book = new Book(book.id, book.volumeInfo.title, book.volumeInfo.authors.join(', '), book.volumeInfo.imageLinks.thumbnail, 'to be read')
  let searchItemContainer = createElement('div', 'search-item-container')
  searchItemContainer.onclick = () => {
    if (library.findIndex((obj) => obj.id == book.id) == -1) {
      addBookToLibrary(book)
      resetSearch()
    } else alert('That book has already been added...')
  }
  createElement('p', 'search-item-title', book.title, searchItemContainer)
  createElement('p', 'search-item-author', book.authors, searchItemContainer)
  searchResultsContainer.appendChild(searchItemContainer)
}

function resetSearch() {
  clearContainer(searchResultsContainer)
  searchResultsContainer.classList.remove('active')
  searchBar.value = ''
}

function displayLibrary() {
  clearContainer(currentlyReadingContainer)
  clearContainer(toBeReadContainer)
  clearContainer(previouslyReadContainer)

  library.forEach(book => { 
    let bookCard = createElement('div', 'book-card')
    bookCard.setAttribute('id', book.id)
    let bookCardRowOne = createElement('div', 'book-card-row-one')
    let bookInfoContainer = createElement('div', 'book-card-info')
    let thumbnail = createElement('div', 'book-card-thumbnail')
    thumbnail.style.backgroundImage = 'url(' + book.thumbnail + ')'
    bookCardRowOne.appendChild(thumbnail)
    bookTextContainer = createElement('div', 'book-text-container')
    createElement('p', 'book-card-title', book.title, bookTextContainer)
    createElement('p', 'book-card-authors', book.authors, bookTextContainer)
    bookCardRowOne.appendChild(bookTextContainer)
    bookInfoContainer.appendChild(thumbnail)
    bookInfoContainer.appendChild(bookTextContainer)
    bookCardRowOne.appendChild(bookInfoContainer)
    let buttonContainer = createElement('div', 'button-container')
    let moveUpButton = createElement('button', 'move-button', '<i class="fa-solid fa-angle-up"></i>')
    moveUpButton.onclick = () => {
      if (book.status == 'currently reading') book.changeStatus('previously read')
      else if (book.status == 'previously read') book.changeStatus('to be read')
      else if (book.status == 'to be read') book.changeStatus('currently reading')
      displayLibrary()
    }
    buttonContainer.appendChild(moveUpButton)
    let deleteButton = createElement('button', 'delete-button', '<i class="fa-solid fa-trash-can"></i>')
    deleteButton.onclick = () => removeBookFromLibrary(book)
    buttonContainer.appendChild(deleteButton)
    let moveDownButton = createElement('button', 'move-button', '<i class="fa-solid fa-angle-down"></i>')
    moveDownButton.onclick = () => {
      if (book.status == 'currently reading') book.changeStatus('to be read')
      else if (book.status == 'to be read') book.changeStatus('previously read')
      else if (book.status == 'previously read') book.changeStatus('currently reading')
      displayLibrary()
    }
    buttonContainer.appendChild(moveDownButton)
    bookCardRowOne.appendChild(buttonContainer)

    let bookCardRowTwo = createElement('div', 'book-card-row-two', '<i class="fa-solid fa-caret-down"></i>')
    let notesContainer = createElement('div', 'notes-container')
    for (let i=0; i<book.notes.length; i++) {
      let notesCard = createElement('div', 'notes-card')
      let label = createElement('div', 'notes-card-label-container')
      let labelButton = createElement('button', 'notes-card-label', book.notes[i].label + '<i class="fa-solid fa-caret-down"></i>', label)
      labelButton.onclick = () => {
        console.log('hello')
      }
      notesCard.appendChild(label)
      notesContainer.appendChild(notesCard)
    }
    bookCardRowTwo.onclick = () => {
      notesContainer.classList.toggle('active')
      bookCardRowTwo.classList.toggle('active')
    }
    bookCard.appendChild(bookCardRowOne)
    bookCard.appendChild(notesContainer)
    bookCard.appendChild(bookCardRowTwo)
    if (book.status == 'currently reading') currentlyReadingContainer.appendChild(bookCard)
    else if (book.status == 'to be read') toBeReadContainer.appendChild(bookCard)
    else if (book.status == 'previously read') previouslyReadContainer.appendChild(bookCard)
  })
}