import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import { useNavigate } from 'react-router';
import { v1 as uuivd1 } from 'uuid'
import "../styles/Exam.scss"
import { Alert, Button, Modal } from 'react-bootstrap';

const Exam = () => {
  const [userData, setUserData] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [summary, setSummary] = useState({});
  const navigate = useNavigate();

  const fetchData = useCallback((id) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3030/questions?examId=${id}`, requestOptions).then(res => res.json()).then(res => setQuestions(res))
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("personInfo");
    if (!user) {
      navigate("/")
    }
    if (user) {
      const ud = JSON.parse(user);
      setUserData(ud);
      fetchData(ud.examData.id)
    }
  }, [fetchData])

  const onSubmit =
    () => {
      let allPresent = true;
      let count = 0
      const totalQuestions = questions.length;
      questions.map(i => {
        if (!answers[i.id]) {
          allPresent = false
          return null;
        }
        const correctOption = i.correct;
        if (answers[i.id] === i[correctOption]) {
          count++;
        }
      })
      if (!allPresent) {
        setError("Please answer all questions");
        return null;
      }
      const summaryInfo = {
        totalQuestions,
        correctAnswers: count,
        percentage: (count / totalQuestions) * 100
      }
      setSummary(summaryInfo);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uuivd1(), examId: userData.examData.id, ...summaryInfo, answers, userData })
      };
      fetch("http://localhost:3030/report", requestOptions).then(res => res.json())
      setShow(true);
      localStorage.removeItem("personInfo")
    }


  return (
    <Layout><div className="exam_wrapper">
      <h1>{userData?.examData?.title || ""}</h1>
      {questions && questions.length > 0 && <div className="question_wrapper">
        <div className="questions_section my-4">
          <h2>Questions</h2>
        </div>
        <div className="questions">
          {questions.map((item, i) => <div className="question" key={item.id}>
            <h3>{i + 1}.&nbsp;{item.question}</h3>
            <ul className='mt-3'>
              <li onClick={() => setAnswers(prev => ({ ...prev, [item.id]: item.A }))}
                className={`${answers?.[item.id] === item.A ? "active" : ""}`}
              >{item.A}</li>
              <li onClick={() => setAnswers(prev => ({ ...prev, [item.id]: item.B }))}
                className={`${answers?.[item.id] === item.B ? "active" : ""}`}
              >{item.B}</li>
              <li onClick={() => setAnswers(prev => ({ ...prev, [item.id]: item.C }))}
                className={`${answers?.[item.id] === item.C ? "active" : ""}`}
              >{item.C}</li>
              <li onClick={() => setAnswers(prev => ({ ...prev, [item.id]: item.D }))}
                className={`${answers?.[item.id] === item.D ? "active" : ""}`}
              >{item.D}</li>
            </ul>
          </div>)}
        </div>
        {error && <Alert variant="danger">
          {error}
        </Alert>}
        <Button className='my-2' variant="primary" onClick={onSubmit}>
          Submit exam
        </Button>
        <Modal show={show} onHide={() => { setShow(false); navigate("/"); }} className='exam_result_modal'>
          <Modal.Header closeButton>
            <Modal.Title>Exam result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className='table result_table'>
              <tr><td>Total questions</td>
                <td>{summary.totalQuestions}</td></tr>
              <tr><td>Correct answers</td>
                <td>{summary.correctAnswers}</td></tr>
              <tr><td>Percentage</td>
                <td>{summary.percentage}%</td></tr>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => { setShow(false); navigate("/"); }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>}
    </div></Layout>
  )
}

export default Exam