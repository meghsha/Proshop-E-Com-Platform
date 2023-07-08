import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App