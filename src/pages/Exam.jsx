import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../Layout'
import { useNavigate } from 'react-router';
import "../styles/Exam.scss"

const Exam = () => {
  const [userData, setUserData] = useState([])
  const [questions, setQuestions] = useState([])
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
  },[fetchData])

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
              <li>{item.A}</li>
              <li>{item.B}</li>
              <li>{item.C}</li>
              <li>{item.D}</li>
            </ul>
          </div>)}
        </div>
      </div>}
    </div></Layout>
  )
}

export default Exam