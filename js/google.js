const searchBar = document.getElementById('search-bar')
searchBar.oninput = () => {
  if (searchBar.value != '') {
    searchResultsContainer.classList.add('active')
    searchBooks(searchBar.value)
  } else {
    clearContainer(searchResultsContainer)
    searchResultsContainer.classList.remove('active')
  }
}

function searchBooks(search) {
  let googleURL = 'https://www.googleapis.com/books/v1/volumes?q='
  fetch(googleURL + search, { mode: 'cors' })
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      console.log(response.items)
      displaySearchResults(response.items)
    })
    .catch(function (err) {
      console.log(err)
    })
}