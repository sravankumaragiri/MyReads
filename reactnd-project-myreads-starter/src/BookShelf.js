import React from 'react'
import { Link } from 'react-router-dom'

class BookShelf extends React.Component {
    render() {
        const { books, handleChange } = this.props;

        let cbooks = [];
        let wbooks = [];
        let rbooks = [];

        if (books) {
            cbooks = books.filter((book) => {
                return book.shelf === 'currentlyReading'
            });

            wbooks = books.filter((book) => {
                return book.shelf === 'wantToRead'
            });

            rbooks = books.filter((book) => {
                return book.shelf === 'read'
            });
        }
        return (
            <div>
             <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {cbooks.map((book) => (
                                    <li key={book.title}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={handleChange}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="none">None</option>
                                                        <option value={`${book.title}:currentlyReading`} selected>Currently Reading</option>
                                                        <option value={`${book.title}:wantToRead`}>Want to Read</option>
                                                        <option value={`${book.title}:read`}>Read</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
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
                                {wbooks.map((book) => (
                                    <li key={book.title}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={handleChange}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="none">None</option>
                                                        <option value={`${book.title}:currentlyReading`}>Currently Reading</option>
                                                        <option value={`${book.title}:wantToRead`} selected>Want to Read</option>
                                                        <option value={`${book.title}:read`}>Read</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {rbooks.map((book) => (
                                    <li key={book.title}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select onChange={handleChange}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="none">None</option>
                                                        <option value={`${book.title}:currentlyReading`}>Currently Reading</option>
                                                        <option value={`${book.title}:wantToRead`}>Want to Read</option>
                                                        <option value={`${book.title}:read`} selected>Read</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'><button>Add a book</button></Link>
            </div>
           </div>     
        );
    }
}
export default BookShelf;