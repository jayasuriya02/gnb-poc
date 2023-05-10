import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap';
import "../styles/Home.css";
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#"><b>Gnb Career</b></Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container button_wrapper">
        <div className="my-3">
          <Button variant="warning" onClick={() => navigate("/create-exam")}>Create Exam</Button>
          <Button variant="success">Attend Exam</Button>
          <Button variant="info">Report</Button>
        </div>
      </div>
    </div>
  )
}

export default Home