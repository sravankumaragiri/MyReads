import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {DebounceInput} from 'react-debounce-input';

class BooksApp extends React.Component {
 
  constructor(props){
    super(props);
    
    this.state={
     books:[],
     currentReading:[],
     read:[],
     wantToRead:[],
      showSearchPage: false,
      searchbooks:[],
      typed:''
    };
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((rbooks) => {
      this.setState({books: [...rbooks]});        
    
    })         
  }

  
  //state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  //}

  serachBook = (query)=>{
    this.setState({searchbooks: []});  
    this.setState({typed: query.trim()});
    
    let rquery = query.trim();
    console.log(rquery) ;
    if(rquery!==""){
      console.log("request "+rquery);
    BooksAPI.search(rquery)
    .then((rbooks) => {
      if(rbooks.length>0 && rquery!==""){     
      this.setState({searchbooks: [...rbooks]});
      }
      else{
        this.setState({searchbooks: []});  
      }
    })  
  } 
  else{
    this.setState({searchbooks: []});  
  }
  
  }

  handleChange=(event) =>{

    var input =event.target.value;
    var inputs=input.split(":");
    let copybook = JSON.parse(JSON.stringify(this.state.books));
    let statebook = copybook.filter((book)=>{
      if(book.title===inputs[0]){
        book.shelf=inputs[1] ;
      }
      return book;
  });
 
  this.setState({books: [...statebook]}); 
  }

  render() {
    let cbooks=[];
    let wbooks=[];
    let rbooks=[];

    if(this.state.books){
     cbooks = this.state.books.filter((book)=>{
        return book.shelf==='currentlyReading'
    });

    wbooks = this.state.books.filter((book)=>{
      return book.shelf==='wantToRead'
    });

    rbooks = this.state.books.filter((book)=>{
      return book.shelf==='read'
    });
    }
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
              
                <input type="text" value={this.state.typed} placeholder="Search by title or author" onChange={this.serachBook}/>
                 */ <DebounceInput placeholder="Search by title or author" 
          minLength={0}
          debounceTimeout={300} onChange={(event) => this.serachBook(event.target.value)}/>
        }
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              
              {                
                this.state.searchbooks.map((book)=>{
                     return (<li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks&&book.imageLinks.smallThumbnail)?book.imageLinks.smallThumbnail:''})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="none"  selected={`${book.shelf && book.shelf}==='' ? 'selected'  : ''`}>None</option>
                                <option value={`${book.title}:currentlyReading` } selected={`${book.shelf && book.shelf}==='currentlyReading' ? 'selected' : ''`}>Currently Reading</option>
                                <option value={`${book.title}:wantToRead`} selected={`${book.shelf && book.shelf}==='wantToRead' ? 'selected' : ''`}>Want to Read</option>
                                <option value={`${book.title}:read`} selected={`${book.shelf && book.shelf}==='read' ? 'selected'  : ''`}>Read</option>
                                
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
                        </div>
                </li>)}
        )}

              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {cbooks.map((book)=>(
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="none">None</option>
                                <option value={`${book.title}:currentlyReading`} selected>Currently Reading</option>
                                <option value={`${book.title}:wantToRead`}>Want to Read</option>
                                <option value={`${book.title}:read`}>Read</option>
                                
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
                        </div>
                      </li>)
        )}
                      
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wbooks.map((book)=>(
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="none">None</option>
                                <option value={`${book.title}:currentlyReading`}>Currently Reading</option>
                                <option value={`${book.title}:wantToRead`} selected>Want to Read</option>
                                <option value={`${book.title}:read`}>Read</option>
                                
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
                        </div>
                      </li>   
                       ) )}                   
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {rbooks.map((book)=>(
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="none">None</option>
                                <option value={`${book.title}:currentlyReading`}>Currently Reading</option>
                                <option value={`${book.title}:wantToRead`}>Want to Read</option>
                                <option value={`${book.title}:read`} selected>Read</option>
                                
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
                        </div>
                      </li>
                       ) ) }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
