import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Bookshelf from './BookShelf'
import SerachBook from './SearchBook'
import update from 'react-addons-update';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchbooks: [],
     typed:''
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((rbooks) => {
        this.setState({ books: [...rbooks] });
      })
  }

  handleChange = (event) => {

    var input = event.target.value;
    var inputs = input.split(":");
    var title = inputs[0];
    var shelf = inputs[1];
    let copybook = JSON.parse(JSON.stringify(this.state.books));
    let statebook = copybook.filter((book) => {
      if (book.title === title) {
        BooksAPI.update(book, shelf);
        book.shelf = shelf;
      }

      return book;
    });

    this.setState({ books: [...statebook] });
  }

  shandleChange = (event) => {

    var input = event.target.value;
    var inputs = input.split(":");
    var title = inputs[0];
    var shelf = inputs[1];
    let copysearchbook = JSON.parse(JSON.stringify(this.state.searchbooks));
    let statesearchbook = copysearchbook.filter((book) => {
      if (book.title === title) {
        BooksAPI.update(book, shelf);
        console.log(book.shelf);
        book.shelf = shelf;
      }      
      return book;
    });

    this.setState({ searchbooks: [...statesearchbook] });
    
    let copybook = JSON.parse(JSON.stringify(this.state.books));
    let statebook = copybook.filter((book) => {
      if (book.title === title) {
        BooksAPI.update(book, shelf);
        console.log(book.shelf);
        book.shelf = shelf;
      }      
      return book;
    });

    if(!statebook){
    this.setState({
      books: this.state.books.concat(statebook)
    });
  }else{
    this.setState({ books: [...statebook] });
  }

   
  }


  serachBook = (query) => {
    this.setState({ searchbooks: [] });
    this.setState({ typed: query.trim()});
    let rquery = query.trim();
    console.log(rquery);
    if (rquery !== "") {
      console.log("request " + rquery);
      BooksAPI.search(rquery)
        .then((rbooks) => {
          if (rbooks.length > 0 && rquery !== "") {
            this.setState({ searchbooks: [...rbooks] });
          }
          else {
            this.setState({ searchbooks: [] });
          }
        })
    }
    else {
      this.setState({ searchbooks: [] });
    }

  }

  render() {
    return (
      <div className="app">
        <div className="list-books">

          <Route exact path='/' render={() => (
            <Bookshelf books={this.state.books} handleChange={this.handleChange} />
          )} />

          <Route path='/search' render={({ history }) => (
            <SerachBook searchbooks ={this.state.searchbooks} serachBook={this.serachBook} shandleChange={this.shandleChange} />
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
