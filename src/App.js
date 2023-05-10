import logo from './logo.svg';
import './App.css';
import { Button, Container, Navbar } from 'react-bootstrap';

function App() {
  return <Container fluid>
     <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#"><b>Gnb Career</b></Navbar.Brand>
      </Container>
    </Navbar>
    <br></br>
    <br></br>
    <br></br>
    <div className="Button-b">
    <Button variant="warning">Create Exam</Button>
    <Button variant="success">Attend Exam</Button>
    <Button variant="info">Report</Button>
    </div>
  </Container>
    
}

export default App;
