import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Input, Container, Label, Alert } from 'reactstrap';
import CameraIcon from "../../assets/camera.png";
import './events.css';

//EventsPage will show all the events
export default function EventsPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState("");
    const [event, setEvent] = useState("");
    const [errorMessqge, setErrorMessage] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail): null;
    }, [thumbnail]);

    const submitHandler = async (evt) => {
        const user_id = localStorage.getItem('user');

        const eventData = new FormData();
        eventData.append("thumbnail", thumbnail);
        eventData.append("event", event);
        eventData.append("title", title);
        eventData.append("price", price);
        eventData.append("description", description);
        eventData.append("date", date);


            try{
                if(title !== "" &&
                description !== "" &&
                price !== "" &&
                event !== "" &&
                date !== "" &&
                thumbnail !== null
            ) {
                await api.post('/event', eventData, {headers: {user_id}});
            } else {
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 2000)

                console.log('Missing required data');
            }
        }
            catch(error) {
                Promise.reject(error);
                console.log(error.message);
            } 

        evt.preventDefault();
    }

    return(
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label>Upload Image: </Label>
                <Label id="thumbnail" style={{backgroundImage : `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}>
                <Input type="file" onChange={(evt) => setThumbnail(evt.target.files[0])}/>
                <img src={CameraIcon} style={{maxWidth: '50px'}} alt="Upload Icon Image" />
                </Label>
                </FormGroup>
            <FormGroup>
                <Label>Event: </Label>
                <Input id="event" type="text" value={event} placeholder="Event name" onChange={(evt) => setEvent(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Title: </Label>
                <Input id="title" type="text" value={title} placeholder="Event title" onChange={(evt) => setTitle(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event description: </Label>
                <Input id="description" type="text" value={description} placeholder="Event description" onChange={(evt) => setDescription(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event price: </Label>
                <Input id="price" type="text" value={price} placeholder="Event Price $0.00" onChange={(evt) => setPrice(evt.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Event date: </Label>
                <Input id="date" type="date" value={date} onChange={(evt) => setDate(evt.target.value)}/>
            </FormGroup>
            <Button type="submit">
                Create Event
            </Button>
            </Form>
            {errorMessqge ? (
                <Alert className="event-validation" color="danger">Missing required information</Alert>
            ): ""}
        </Container>
    );
}