import React, { useState } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';


export default function Register({ history }) {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('User details are: ', email, password, firstName, lastName);

        const response = await api.post('/user/register', { email, password, firstName, lastName });
        const userId = response.data._id || false;

        if(userId) {
            localStorage.setItem('user', userId);
            history.push('/dashboard');
        }
        else {
            const { message } = response.data;
            console.log(message);
        }
    }

    return(
      <Container>
        <h2>Register</h2>
        <p>Please register a new account</p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="text" name="firstName" id="firstName" placeholder="Your first name" onChange={evt => setFirstName(evt.target.value)} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="lastName" id="lastName" placeholder="Your last name" onChange={evt => setLastName(evt.target.value)} />
          </FormGroup>
          <FormGroup>
            <Input type="email" name="email" id="email" placeholder="Email" onChange={evt => setEmail(evt.target.value)} />
          </FormGroup>
          {' '}
          <FormGroup>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={evt => setPassword(evt.target.value)} />
          </FormGroup>
          {' '}
          <Button>Submit</Button>
      </Form>
      </Container>

  
    );
}