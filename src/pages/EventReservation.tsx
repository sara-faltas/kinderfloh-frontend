import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Card, Button, Spinner, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  totalTables: number;
  availableTables: number;
};


const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    tableNumber: "",
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!event) {
    return <Spinner animation="border" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/reservations", {
        parentName: formData.parentName,
        email: formData.email,
        tableNumber: Number(formData.tableNumber),
        eventId: Number(id),
      });

      setMessage("Reservation created successfully 🎉 Kindly wait confirmation from the organizer");

      setFormData({
        parentName: "",
        email: "",
        tableNumber: "",
      });
      setShowForm(false);
      fetchEvent();
    } catch (error) {
      console.log(error);
      setMessage("Could not reserve this table");
    }
  };

  if (!event) {
    return <Spinner animation="border" />;
  }

  
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>

          <Card.Text>{event.description}</Card.Text>

          <Card.Text>📍 {event.location}</Card.Text>

          <Card.Text>📅 {new Date(event.date).toDateString()}</Card.Text>

          <Card.Text>🪑 Available tables: {event.availableTables}</Card.Text>
          <Link to={`/`} className="btn btn-secondary ms-2">
            Back
          </Link>
        

          {message && <Alert>{message}</Alert>}

          {!showForm && (
            <Button onClick={() => setShowForm(true)}className="ms-2" >Reserve a table</Button>
          )}
          

          {showForm && (
            <Form className="mt-4" onSubmit={handleReservation}>
              <Form.Group className="mb-3">
                <Form.Label>Parent name</Form.Label>

                <Form.Control
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Table number</Form.Label>

                <Form.Control
                  type="number"
                  name="tableNumber"
                  min="1"
                  max={event.totalTables}
                  value={formData.tableNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button type="submit">Confirm Reservation</Button>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setShowForm(false);

                    setFormData({
                      parentName: "",
                      email: "",
                      tableNumber: "",
                    });

                    setMessage("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
export default EventDetails;
