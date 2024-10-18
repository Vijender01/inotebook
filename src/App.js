import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes, // Note the change here
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes> {/* Replace Switch with Routes */}
              <Route path="/"  exact element={<Home showAlert={showAlert} />} /> {/* Use 'element' prop to render components */}
              <Route path="/about" exact element={<About />} />
              <Route path="/signup" exact element={<Signup showAlert={showAlert} />} />
              <Route path="/login" exact element={<Login showAlert={showAlert} />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
