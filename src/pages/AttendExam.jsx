import React, { useState } from 'react';
import Layout from '../Layout';
import { Button, Form, Modal } from 'react-bootstrap';
import "../styles/AttendExam.css"

function AttendExam() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <Layout>
        <Button className='my-5' variant="primary" onClick={handleShow}>
          Attend Exam
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Fillup</Modal.Title>
          </Modal.Header>
          <div className='form_section'>
          <Form>
      <Form.Group className="my-2 mx-2" controlId="formGroupname">
        <Form.Label><h6>Name</h6></Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="my-2 mx-2" controlId="formGroupage">
        <Form.Label><h6>Age</h6></Form.Label>
        <Form.Control type="number" min="1" />
      </Form.Group>
      <Form.Group className="my-2 mx-2" controlId="formGroupdob">
        <Form.Label><h6>DOB</h6></Form.Label>
        <Form.Control type="date" />
      </Form.Group>
    </Form>
      
      </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Proceed</Button>
          </Modal.Footer>
        </Modal>
        </Layout>
    );
  }

export default AttendExam;