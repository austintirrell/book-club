let searchBooks = (search) => {
  if (search == '') {
    return
  }
  let url = 'https://www.googleapis.com/books/v1/volumes?q='
  fetch(url + search, { mode: 'cors' })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data.items)
      displayResults(data.items)
    })
}