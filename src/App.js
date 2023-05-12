import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateExam from './pages/CreateExam';
import AttendExam from './pages/AttendExam';
import Exam from './pages/Exam';

// https://www.edsys.in/general-knowledge-for-kids-105-questions-and-answers/#1

function App() {
  return <BrowserRouter>
    <Routes>

      <Route exact path='/' Component={Home} />
      <Route path='/create-exam' Component={CreateExam} />
      <Route path='/attend-exam' Component={AttendExam} />
      <Route path='/exam' Component={Exam} />
    </Routes>
  </BrowserRouter>

}

export default App;
