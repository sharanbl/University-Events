import React from 'react';
import { Container } from 'reactstrap';
import Routes from './routes';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (

      <Container>
        <h1>University Events</h1>
        <Routes />
      </Container>

  );
}

export default App;
