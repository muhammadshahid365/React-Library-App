import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [allStudents, setStudents] = useState([])
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`http://localhost:8080/books?id=${id}`);
      const book = response.data[0];
      setBook(book);
      setName(book.book_name);
      setAuthor(book.author);
      setBorrowedBy(book.borrowed_by);
      const booking_date = book.date_of_borrow;
      if(booking_date){
        setBorrowDate(new Date(booking_date).toISOString().split('T')[0]);
      }
      const return_date = book.expected_date_of_return;
      if(return_date){
        setReturnDate(new Date(return_date).toISOString().split('T')[0]);
      }

      response = await axios.get('http://localhost:8080/students');
      const students = response.data;
      setStudents(students);
    }

    getData();
  }, [])

  const handleUpdateBook = async () => {
    await axios.patch(
      `http://localhost:8080/books?id=${book.id}`,
      bookParams()
    )
    navigate('/books');
  }

  const bookParams = () => ({
    book_name: name,
    author,
    borrowed_by: borrowedBy,
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
                  allStudents.map(student => (
                    <MenuItem value={student.id}>{`${student.first_name} ${student.last_name}`}</MenuItem>
                  ))
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

export default Edit
