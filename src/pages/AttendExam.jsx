import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../Layout';
import { Button, Form, Modal } from 'react-bootstrap';
import "../styles/AttendExam.css"

function AttendExam() {
  const [show, setShow] = useState(false);
  const [examList, setExamList] = useState([]);
  const [exam, setExam] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3030/exams`, requestOptions).then(res => res.json()).then(res => {
      console.log(res);
      setExamList(res)
    })
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData])


  return (
    <Layout>
      <div className="attend_exam_wrapper my-4">
        <h3>Select Exam</h3>
        <Form.Select aria-label="Select Exam option" className='w-50' name='select-exam' onChange={(e) => setExam(e.target.value)} value={exam}>
          <option>Select exam</option>
          {
            examList && examList.length > 0 && examList.map(i => <option value={i.id} key={i.id}>{i.title}</option>)
          }
        </Form.Select>
      </div>
      {
        exam && <div className="attendie_info">
          <h3>Please fill the information to proceed</h3>
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
          <Button className='my-2' variant="primary" onClick={handleShow}>
            Proceed
          </Button>
        </div>
      }
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Fillup</Modal.Title>
        </Modal.Header>
        <div className='form_section p-3'>
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
      </Modal> */}
    </Layout>
  );
}

export default AttendExam;