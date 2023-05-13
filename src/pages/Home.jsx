import React from 'react'
import { Button } from 'react-bootstrap';
import "../styles/Home.css";
import { useNavigate } from 'react-router';
import Layout from '../Layout';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="button_wrapper">
        <div className="my-3">
          <Button variant="warning" onClick={() => navigate("/create-exam")}>Create Exam</Button>
          <Button variant="success" onClick={() => navigate("/attend-exam")}>Attend Exam</Button>
          <Button variant="info" onClick={() => navigate("/report")}>Report</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Home