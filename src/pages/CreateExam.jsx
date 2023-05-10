import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Layout from '../Layout'
import "../styles/CreateExam.scss"

const CreateExam = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correct: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <Layout>
      <div className='create_exam my-4'>
        <h1 className='my-4'>Create Exam</h1>
        <form className='my-4'>
          <label htmlFor="examtitle"><h3>Exam Title</h3></label>
          <input className="text-box form-control w-25" type="text" placeholder="" />
        </form>
        <div className="questions_section my-4">
          <h3>Question</h3>
          <div className="button-add">
            <Button variant="success" onClick={handleShow}>Add Question</Button>
          </div>
        </div>
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
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default CreateExam