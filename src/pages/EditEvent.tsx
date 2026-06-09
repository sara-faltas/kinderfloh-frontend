import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




const EditEvent = () => {

const [formData, setFormData] = useState({
  title: "",
  description: "",
  location: "",
  date: "",
  totalTables: "",
});

const { id } = useParams();
const navigate = useNavigate();

useEffect(() => {
  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);

      setFormData({
        title: response.data.title,
        description: response.data.description,
        location: response.data.location,
        date: response.data.date.split("T")[0],
        totalTables: String(response.data.totalTables),
      });

    } catch (error) {
      console.log(error);
    }
  };

  fetchEvent();
}, [id]);


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {

    await api.put(`/events/${id}`, {
      ...formData,
      totalTables: Number(formData.totalTables),
    });

    navigate(`/events/${id}`);

  } catch (error) {
    console.log(error);
  }
};

return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Edit Event</Card.Title>

          {/* {message && <Alert>{message}</Alert>} */}

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

            <Button type="submit">
  Save Changes
</Button>
    <Button onClick={() => navigate(`/events/${id}`)} variant="secondary">
  cancel
</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};



export default EditEvent;