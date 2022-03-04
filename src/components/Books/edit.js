import React, { useEffect, useState } from 'react'
import { Card, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router'

const Edit = (props) => {
  const [book, setBook] = useState({})
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [borrowedBy, setBorrowedBy] = useState('')
  const [borrowDate, setBorrowDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [students, setStudents] = useState([])
  const { id } = useParams();

  useEffect(() => {
    getBook(id, setBook, setAllValues)
  }, [])

  const setAllValues = () => {
    console.log(book);
    setName(book.book_name)
    // setAuthor(book.author)
    // setBorrowedBy(book.borrowed_by)
    // setBorrowDate(book.date_of_borrow)
    // setReturnDate(book.expected_date_of_return)
  }

  const handleUpdateBook = async () => {
    await axios.patch(
      'http://localhost:8080/books',
      bookParams()
    )
    window.location = '/books'
  }

  const bookParams = () => ({
    book_name: name,
    author,
    // borrowed_by: borrowedBy,
    date_of_borrow: borrowDate ? borrowDate : null,
    expected_date_of_return: returnDate ? returnDate : null
  });

  return (
    <div>
      <h1>Update Book</h1>
      <Card variant='outlined' sx={{
        maxWidth: '40%',
        margin: '0 auto',
        padding: 3
      }} >
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth required />
          </Grid>
          <Grid xs={12} item>
            <TextField label="Author" value={author} onChange={e => setAuthor(e.target.value)} fullWidth required />
          </Grid>
          <Grid xs={12} item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Borrowed By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={borrowedBy}
                label="Borrowed By"
                onChange={e => setBorrowedBy(e.target.value)}
              >
                {
                  students.map(student => {
                    <MenuItem value={student.id}>{`${student.first_name} ${student.last_name}`}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <TextField type='date' label="Borrow Date" value={borrowDate} onChange={e => setBorrowDate(e.target.value)} fullWidth />
          </Grid>
          <Grid xs={12} item>
            <TextField type='date' label="Date of return" value={returnDate} onChange={e => setReturnDate(e.target.value)} fullWidth />
          </Grid>
          <Grid xs={12} item>
            <Button variant='contained' fullWidth onClick={handleUpdateBook} >Update</Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

const getBook = async (id, setBook, setAllValues) => {
  const response = await axios.get(`http://localhost:8080/books?id=${id}`);
  setBook(response.data[0]);
  setAllValues()
}

export default Edit