let library = []

function Book(id, title, authors, thumbnail, status) {
  this.id = id
  this.title = title
  this.authors = authors
  this.thumbnail = thumbnail
  this.status = status
  
  this.changeStatusUp = () => {
    if (this.status == 'currently reading') this.status = 'previously read'
    else if (this.status == 'to be read') this.status = 'currently reading'
    else if (this.status == 'previously read') this.status = 'to be read'
  }
  this.changeStatusDown = () => {
    console.log('down')
    if (this.status == 'currently reading') this.status = 'to be read'
    else if (this.status == 'to be read') this.status = 'previously read'
    else if (this.status == 'previously read') this.status = 'currently reading'
  }
}

function addBookToLibrary(book) {
  library[library.length] = book
  displayLibrary()
}