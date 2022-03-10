import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StudentsTable from './table'
import './students.css'
import axios from 'axios'

const Index = () => {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:8080/students');
      setAllStudents(response.data);
    }

    getData();
  }, [])
  return (
    <div>
      <div className="heading">
        <h1>Students Index Page</h1>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddButton}
        >
          Add Student
          </Button>
      </div>
      <div className='students-container'>
        <StudentsTable students={allStudents} />
      </div>
    </div>
  )
}

const handleAddButton = () => {
  window.location = '/students/new'
}

export default Index
