import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateExam from './pages/CreateExam';

function App() {
  return <BrowserRouter>
    <Routes>

      <Route exact path='/' Component={Home} />
      <Route path='/create-exam' Component={CreateExam} />
    </Routes>
  </BrowserRouter>

}

export default App;
