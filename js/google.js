const searchBar = document.getElementById('search-bar')
searchBar.oninput = () => {
  if (searchBar.value != '') searchBooks(searchBar.value)
}

function searchBooks(search) {
  let googleURL = 'https://www.googleapis.com/books/v1/volumes?q='
  fetch(googleURL + search, { mode: 'cors' })
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      console.log(response.items)
    })
    .catch(function (err) {
      console.log(err)
    })
}