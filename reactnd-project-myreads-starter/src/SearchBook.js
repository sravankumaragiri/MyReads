import React from 'react'
import { Link } from 'react-router-dom'

import { DebounceInput } from 'react-debounce-input';

class SearchBook extends React.Component {

    render() {
        const { searchbooks, serachBook, shandleChange } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'> <button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput placeholder="Search by title or author" minLength={0}
                            debounceTimeout={300} onChange={(event) => serachBook(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchbooks.map((book) => {
                                return (<li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) ? book.imageLinks.smallThumbnail : ''})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={shandleChange}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="none" >None {(book.shelf==='currentlyReading')?'selected':''}</option>
                                                    <option value={`${book.title}:currentlyReading`} selected={(book.shelf==='currentlyReading')?'selected':''} >Currently Reading</option>
                                                    <option value={`${book.title}:wantToRead`} selected={(book.shelf==='wantToRead')?'selected':''} >Want to Read</option>
                                                    <option value={`${book.title}:read`} selected={(book.shelf==='read')?'selected':''} >Read</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
                                    </div>
                                </li>)
                            }
                            )}

                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchBook;