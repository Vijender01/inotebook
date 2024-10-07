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

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message= 'This is amazing!!!!!!!!!!! '/>
        <div className='container'>
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" exact element={<Home />} /> {/* Use 'element' prop to render components */}
          <Route path="/about" exact element={<About />}/> 
          <Route path="/signup" exact element={<Signup />}/> 
          <Route path="/login" exact element={<Login />}/> 

        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
