import React, { useEffect, useState } from 'react'
import './books.css'
import { Button, Card } from '@mui/material';

const Index = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks(setBooks)
  }, [])

  return (
    <div>
      <div className="heading">
        <h1>Books Index Page</h1>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddButton}
        >
          Add Book
        </Button>
      </div>
      <div className="books-container">
        {
          books.map(book => {
            return (
              <Card key={book.id} variant="outlined" sx={{
                width: 300,
                padding: 2,
                margin: 3
              }} >
                <h3>{book.book_name}</h3>
                <p>By: {book.author}</p>
                <hr />
                <p>Borrowed by: {book.borrowed_by}</p>
                <p>Borrowed on: {
                  book.date_of_borrow ?
                  new Date(book.date_of_borrow).toDateString() :
                  null
                }
                </p>
                <p>Will return on: {
                  book.expected_date_of_return ?
                    new Date(book.expected_date_of_return).toDateString() :
                    null
                }
                </p>
                <Button variant="outlined" color="warning" onClick={() => window.location = `/books/${book.id}`} >Edit</Button>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

const getBooks = async setBooks => {
  const response = await fetch("http://localhost:8080/books", {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
  const json = await response.json()
  setBooks(json)
}

const handleAddButton = () => {
  window.location = '/books/new'
}

export default Index
