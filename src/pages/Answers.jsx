import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import { useNavigate, useParams } from 'react-router';
import { v1 as uuivd1 } from 'uuid'
import "../styles/Exam.scss"
import { Alert, Button, Modal } from 'react-bootstrap';

const Answers = () => {
  const [questions, setQuestions] = useState([])
  const { id } = useParams();

  const fetchData = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3030/questions?examId=${id}`, requestOptions).then(res => res.json()).then(res => setQuestions(res))
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Layout><div className="exam_wrapper">
      <div className="questions_section my-4">
        <h2>Answers</h2>
      </div>
      <div className="questions">
        {questions.map((item, i) => <div className="question" key={item.id}>
          <h3>{i + 1}.&nbsp;{item.question}</h3>
          <ul className='no-hover mt-3'>
            <li
              className={`${item.correct === "A" ? "active" : ""}`}
            >{item.A}</li>
            <li
              className={`${item.correct === "B" ? "active" : ""}`}
            >{item.B}</li>
            <li
              className={`${item.correct === "C" ? "active" : ""}`}
            >{item.C}</li>
            <li
              className={`${item.correct === "D" ? "active" : ""}`}
            >{item.D}</li>
          </ul>
        </div>)}
      </div>

    </div></Layout>
  )
}

export default Answers