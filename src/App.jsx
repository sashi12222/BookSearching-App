// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="App">
      <h1>Book Search App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter book title"
        />
        <button type="submit">Search</button>
      </form>
      {selectedBook && (
        <div className="selected-book">
          <h2>{selectedBook.volumeInfo.title}</h2>
          <p>Author: {selectedBook.volumeInfo.authors?.join(', ')}</p>
          <img
            src={selectedBook.volumeInfo.imageLinks?.thumbnail}
            alt={selectedBook.volumeInfo.title}
          />
        </div>
      )}
      <div className="search-results">
        {books.map((book) => (
          <div key={book.id} onClick={() => handleBookClick(book)}>
            <h3>{book.volumeInfo.title}</h3>
            <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
