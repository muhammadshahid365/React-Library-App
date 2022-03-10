import React, { useEffect, useState } from 'react'
import { Card, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router'

const Edit = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { id } = useParams();

  const handleUpdateStudent = async () => {
    await axios.patch(
      `http://localhost:8080/students?id=${id}`, {
        first_name: firstName,
        last_name: lastName
      }
    )
    window.location = '/students'
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://localhost:8080/students?id=${id}`);
      setFirstName(response.data[0].first_name);
      setLastName(response.data[0].last_name);
    }
    getData()
  }, [])
  return (
    <div>
      <h1>Edit Student</h1>
      <Card variant='outlined' sx={{
        maxWidth: '40%',
        margin: '0 auto',
        padding: 3
      }} >
        <Grid container spacing={2}>
        <Grid xs={12} item>
            <TextField label="First name" value={firstName} onChange={e => setFirstName(e.target.value)} fullWidth required />
          </Grid>
          <Grid xs={12} item>
            <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} fullWidth required />
          </Grid>
          <Grid xs={12} item>
            <Button variant='contained' fullWidth onClick={handleUpdateStudent} >Update</Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Edit
