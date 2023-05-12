import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../Layout';
import { Button, Form } from 'react-bootstrap';
import "../styles/AttendExam.css"
import { useNavigate } from 'react-router';

const initalPersonalData = {
  name: "",
  age: null,
  dob: null,
}

function AttendExam() {
  const [examList, setExamList] = useState([]);
  const [personalData, setPersonalData] = useState(initalPersonalData);
  const [exam, setExam] = useState(null);
  const navigate = useNavigate();

  const proceedToExam = () => {
    const params = { ...personalData, examData: examList.find(e => e.id === exam) };
    console.log(params);
    localStorage.setItem("personInfo", JSON.stringify(params));
    setPersonalData(initalPersonalData);
    navigate("/exam")
  }

  const handleChange = (e) => setPersonalData(p => ({ ...p, [e.target.name]: e.target.value }));

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
              <Form.Control type="text" value={personalData.name} name="name" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="my-2 mx-2" controlId="formGroupage">
              <Form.Label><h6>Age</h6></Form.Label>
              <Form.Control type="number" min="5" max="80" value={personalData.age} name="age" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="my-2 mx-2" controlId="formGroupdob">
              <Form.Label><h6>DOB</h6></Form.Label>
              <Form.Control type="date" value={personalData.dob} name="dob" onChange={handleChange} />
            </Form.Group>
          </Form>
          <Button className='my-2' variant="primary" onClick={proceedToExam}>
            Proceed
          </Button>
        </div>
      }
    </Layout>
  );
}

export default AttendExam;