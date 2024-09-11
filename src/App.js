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

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <div className='container'>
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" exact element={<Home />} /> {/* Use 'element' prop to render components */}
          <Route path="/about" exact element={<About />}/> 
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
