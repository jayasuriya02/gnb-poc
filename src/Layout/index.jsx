import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand to="/" as={Link}><b>Gnb Career</b></Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default Layout