import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppBar from './components/AppBar'
import Books from './components/Books'
import Students from './components/Students'
import NewBook from './components/Books/new'
import EditBook from './components/Books/edit'

function App() {
  return (
    <div className="App">
      <AppBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/new" element={<NewBook />} />
          <Route path="/books/:id" element={<EditBook />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
