import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'

const CreateExam = () => {
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#"><b>Gnb Career</b></Navbar.Brand>
        </Container>
      </Navbar>
    <div>
      <h1>Create Exam</h1>
      <form action="">
      <label htmlFor="examtitle"><h3>Exam Title</h3></label><br/>
      <input className="text-box" type="text" placeholder=""/>
      </form>
      <div className="addquestions">
      <h3>Question</h3>
      <div className="button-add">
      <Button variant="success">Add Question</Button>
      </div>
      </div>
    </div>
    </div>
  )
}

export default CreateExam