import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Layout from '../Layout'
import "../styles/CreateExam.scss"
import { v1 as uuivd1 } from 'uuid'
import { useNavigate } from 'react-router'

const uniqueExamId = uuivd1()
const initalVal = {
  question: "",
  A: "",
  B: "",
  C: "",
  D: "",
  correct: null,
}

const CreateExam = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initalVal);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3030/questions?examId=${uniqueExamId}`, requestOptions).then(res => res.json()).then(res => setQuestions(res))
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: uuivd1(), examId: uniqueExamId, ...formData })
    };
    fetch("http://localhost:3030/questions", requestOptions).then(res => res.json()).then(() => fetchData())
    setFormData(initalVal);
    handleClose();
  }

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const postExam = () => {
    if (!title) {
      return null;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: uniqueExamId, title })
    };
    fetch("http://localhost:3030/exams", requestOptions).then(res => res.json()).finally(() => navigate("/"))
  }

  return (
    <Layout>
      <div className='create_exam my-4'>
        <h1 className='my-4'>Fill exam information</h1>
        <form className='my-4'>
          <label htmlFor="examtitle"><h3>Exam Title</h3></label>
          <input className="text-box form-control w-25" type="text" placeholder="Enter exam title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </form>
        <div className="button-add">
          <Button variant="primary" className='me-4' onClick={handleShow}>Add Question</Button>
          <Button variant="success" onClick={postExam}>Create Exam</Button>
        </div>
        {questions && questions.length > 0 && <div className="question_wrapper">
          <div className="questions_section my-4">
            <h2>Questions</h2>
          </div>
          <div className="questions">
            {questions.map(item => <div className="question" key={item.id}>
              <h3>{item.question}</h3>
              <h5>Options</h5>
              <ul>
                <li>{item.A}</li>
                <li>{item.B}</li>
                <li>{item.C}</li>
                <li>{item.D}</li>
              </ul>
            </div>)}
          </div>
        </div>}
      </div>
      <Modal show={show} onHide={handleClose} className='create_exam_modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control value={formData.question} name="question" onChange={handleChange} as="textarea" rows={3} />
            </Form.Group>
            <div className="options_group">
              <h6>Options</h6>
              <div className="options_list">
                <div className="input_box">
                  <label htmlFor="A">A</label>
                  <input type="text" value={formData.A} className='form-control' name="A" onChange={handleChange} id="A" />
                </div>
                <div className="input_box">
                  <label htmlFor="B">B</label>
                  <input type="text" value={formData.B} className='form-control' name="B" onChange={handleChange} id="B" />
                </div>
                <div className="input_box">
                  <label htmlFor="C">C</label>
                  <input type="text" value={formData.C} className='form-control' name="C" onChange={handleChange} id="C" />
                </div>
                <div className="input_box">
                  <label htmlFor="D">D</label>
                  <input type="text" value={formData.D} className='form-control' name="D" onChange={handleChange} id="D" />
                </div>
              </div>
            </div>
            <div className="correct_option">
              <h6>Correct option</h6>
              <Form.Select aria-label="Correct option" name='correct' onChange={handleChange} value={formData.correct}>
                <option>Select option</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Select>
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { console.log(formData); }}>
            Add next question
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default CreateExam