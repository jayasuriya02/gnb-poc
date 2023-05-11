import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateExam from './pages/CreateExam';
import AttendExam from './pages/AttendExam';

function App() {
  return <BrowserRouter>
    <Routes>

      <Route exact path='/' Component={Home} />
      <Route path='/create-exam' Component={CreateExam} />
      <Route path='/attend-exam' Component={AttendExam} />
    </Routes>
  </BrowserRouter>

}

export default App;
