import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : [],
    shelfs : {currentlyReading : "Currently Reading", wantToRead : ' Want To Read', read: "Read"},
    query : '',
    results : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books : books})
    })
  }

  updateQuery(query) {
    console.log(query)
    BooksAPI.search(query.trim(), 5).then((results) => {
      this.setState({results : results})
      console.log(results)
    })
  }

  handleChange(event){
    console.log(event)
  }

  handleSubmit(event){
    console.log(event)
  }



  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
                <BookShelf books={this.state.books} shelfs={this.state.shelfs} shelfName={'currentlyReading'}/>
                <BookShelf books={this.state.books} shelfs={this.state.shelfs} shelfName={'wantToRead'}/>
                <BookShelf books={this.state.books} shelfs={this.state.shelfs} shelfName={'read'}/>
                <div className="open-search">
                  <Link to='/search' >Add a book</Link>
                </div>
          </div>
        )}
        />

        <Route path="/search" render={() =>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.results.map((result) => (
                <li key={result.id}>
                      <Book book = {result} handleChange = {this.handleChange} handleSubmit={this.handleSubmit}/>
                </li>
              ))}
              </ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
