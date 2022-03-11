import React, { useState } from 'react'
import { Card, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const New = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleAddStudent = async () => {
    await axios.post(
      'http://localhost:8080/students',{
        first_name: firstName,
        last_name: lastName
      }
    )
    navigate('/students')
  }

  return (
    <div>
      <h1>Add New Student</h1>
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
            <Button variant='contained' fullWidth onClick={handleAddStudent} >Add student</Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default New
