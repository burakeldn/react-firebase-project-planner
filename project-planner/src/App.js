import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import AddProject from './pages/addProject'
import EditProject from './pages/editProject'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/addproject' element={<AddProject />} />
        <Route path="/editproject" element={<EditProject />} />
      </Routes>
    </div>
  );
}

export default App;
