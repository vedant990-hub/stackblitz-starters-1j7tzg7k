const express = require('express');
const bodyParser = require('body-parser');

// Load books data using your preferred method
let books = require('./data.json');

const app = express();
app.use(bodyParser.json());

// Create a New Book (C)
app.post('/books', (req, res) => {
  const { book_id, title, author, genre, year, copies } = req.body;

  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newBook = { book_id, title, author, genre, year, copies };
  books.push(newBook);  // Add the new book to the in-memory array

  res.status(201).json(newBook);
});

// Read Book Information (R)
app.get('/books', (req, res) => {
  res.status(200).json(books);  // Return all books in memory
});

// Retrieve a Specific Book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.book_id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json(book);
});

// Update Book Information (U)
app.put('/books/:id', (req, res) => {
  const { title, author, genre, year, copies } = req.body;
  const book = books.find(b => b.book_id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Update the book's details
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (year) book.year = year;
  if (copies) book.copies = copies;

  res.status(200).json(book);
});

// Delete a Book (D)
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.book_id === req.params.id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(bookIndex, 1);  // Remove the book from the in-memory array

  res.status(200).json({ message: 'Book deleted successfully' });
});

require('dotenv').config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
