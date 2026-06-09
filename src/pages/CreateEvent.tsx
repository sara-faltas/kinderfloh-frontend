import { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import api from "../api/axios";

const CreateEvent = () => {
    console.log("Create Event loaded");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    totalTables: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/events", {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        totalTables: Number(formData.totalTables),
      });
      setMessage("Event created successfully 🎉");
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error: any) {
      console.log(error);

      setMessage(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Create KinderFloh Event</Card.Title>

          {message && <Alert>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event title</Form.Label>

              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>

              <Form.Control
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>

              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of tables</Form.Label>

              <Form.Control
                type="number"
                name="totalTables"
                min="1"
                value={formData.totalTables}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit">Create Event</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateEvent;
