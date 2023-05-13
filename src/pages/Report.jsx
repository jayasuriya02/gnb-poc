import React, { useEffect, useCallback, useState } from 'react'
import Layout from '../Layout'
import "../styles/Report.css"
import { Button, Modal } from 'react-bootstrap';
import { groupBy } from 'lodash';
import { useNavigate } from 'react-router';

function Report() {
  const [reportData, setReportData] = useState();
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3030/report`, requestOptions).then(res => res.json()).then(res => {
      const groupedData = groupBy(res, (a) => a.examId);
      setReportData(groupedData)
    })
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  console.log(reportData);
  return (
    <Layout>
      <h1 className="Title_report">View Report</h1>
      <table className='table'>
        <thead style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          <tr>
            <td>S.no</td>
            <td>Title</td>
            <td>Total questions</td>
            <td>Total attendees</td>
            <td>Average correct answers</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {reportData && Object.values(reportData).length > 0 ? Object.values(reportData).map((item, index) => {
            const firstData = item[0];
            const totalAttendees = item.length;
            const totalQuestions = firstData.totalQuestions
            const CorrectAns = item.reduce((tot, i) => tot + i.correctAnswers, 0)
            const averageCorrectAns = CorrectAns / (totalQuestions * totalAttendees) * totalQuestions;
            return (<tr key={item.id}>
              <td>{index + 1}</td>
              <td>{firstData.userData.examData.title}</td>
              <td>{totalQuestions}</td>
              <td>{totalAttendees}</td>
              <td>{Math.round(averageCorrectAns)}</td>
              <td><Button variant="primary" onClick={() => setPopup(item)}>
                View answers
              </Button></td>
            </tr>)
          }) : <></>}
        </tbody>
      </table>
      <Modal show={!!popup} onHide={() => { setPopup(null); }} className='answer_modal' centered>
        <Modal.Header closeButton>
          <Modal.Title>View answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className='table'>
            <thead style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              <tr>
                <td>S.no</td>
                <td>Name</td>
                <td>Total questions</td>
                <td>Total correct answers</td>
                <td>Percentage</td>
                <td>View</td>
              </tr>
            </thead>
            <tbody>
              {popup && popup.length > 0 ? popup.map((item, index) => {

                return (<tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.userData.name}</td>
                  <td>{item.totalQuestions}</td>
                  <td>{item.correctAnswers}</td>
                  <td>{(item.correctAnswers / item.totalQuestions) * 100}%</td>
                  <td><Button variant="primary" onClick={() => navigate(`/answers/${item.examId}`)}>
                    View answers
                  </Button></td>
                </tr>)
              }) : <></>}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => { setPopup(null) }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default Report
