import React from 'react';
import Book from './Book'

class BookShelf extends React.Component {

  render() {
    const { books, shelfs , shelfName, handleChange, handleSubmit } = this.props
    return (
        <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfs[shelfName]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter((book) => (book.shelf === shelfName)).map((book) => (
                  <li key={book.id}>
                        <Book book = {book} handleChange = {handleChange} handleSubmit = {handleSubmit} />
                  </li>
                ))}
                </ol>
              </div>
            </div>
        </div>
    )
  }
}

export default BookShelf
