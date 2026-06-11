import { useEffect, useState } from "react";
import api from "../api/axios";
import { Form,Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  totalTables: number;
  availableTables?: number;
};

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())||
  event.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container fluid className="p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className="mb-0">
            <Link to="/" className="text-decoration-none text-dark">
              🎪 KinderFloh
            </Link>
          </h4>
        </Col>
        <Col>
          <h5 className="mb-0">Events</h5>
          <small className="text-muted">See all events</small>
        </Col>
        <Col className="text-end">
          <Link to="/admin" className="btn btn-dark">
            Admin Dashboard
          </Link>
        </Col>
      </Row>

      <Row>
        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search events by name or location ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
        {filteredEvents.length === 0 ? (
          <p className="text-muted">No events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <Col md={4} key={event.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>📍 {event.location}</Card.Text>
                  <Card.Text>
                    🗓 {new Date(event.date).toDateString()}
                  </Card.Text>
                  <Card.Text>
                    🎟 Tables: {event.availableTables ?? event.totalTables}
                  </Card.Text>
                  <Link to={`/events/${event.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;
