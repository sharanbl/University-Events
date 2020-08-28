import React, { useState } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Input, Container } from 'reactstrap';


export default function Login({ history }) {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Email and passowrd given by the user is: ', email, password);

        const response = await api.post('/Login', { email, password });
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
            <h2>Login</h2>
            <p>Please login to continue</p>
            <Form onSubmit={handleSubmit}>
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