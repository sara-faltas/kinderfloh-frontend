import { useEffect, useState } from "react";
import api from "../api/axios";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  totalTables: number;
};

type Reservation = {
  id: number;
  parentName: string;
  email: string;
  tableNumber: number;
  event: {
    title: string;
  };
};

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const eventsRes = await api.get("/events");
      const reservationsRes = await api.get("/reservations");

      setEvents(eventsRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;
    try {
      await api.delete(`/events/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const groupedReservations = reservations.reduce((acc: any, r) => {
    const eventTitle = r.event.title;

    if (!acc[eventTitle]) {
      acc[eventTitle] = [];
    }

    acc[eventTitle].push(r);

    return acc;
  }, {});

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
          <h5 className="mb-0">Admin Dashboard</h5>
          <small className="text-muted">Manage events and reservations</small>
        </Col>

        <Col className="text-end">
          <Link to="/create-event" className="btn btn-success">
            + Create Event
          </Link>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Total Events</h6>
              <h3>{events.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Total Reservations</h6>
              <h3>{reservations.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Active Tables Booked</h6>
              <h3>{reservations.reduce((acc, r) => acc + 1, 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* EVENTS */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Events</h5>

              {events.map((event) => (
                <Card key={event.id} className="mb-2 border-0 bg-light">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{event.title}</strong>
                      <div className="text-muted small">{event.location}</div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        href={`/events/${event.id}`}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        href={`/edit-events/${event.id}`}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* RESERVATIONS SECTION */}

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Reservations by Event</h5>

              {Object.entries(groupedReservations).map(
                ([eventTitle, resList]: any) => (
                  <div key={eventTitle} className="mb-4">
                    {/* EVENT HEADER (CLICKABLE) */}
                    <h6
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const event = reservations.find(
                          (r) => r.event.title === eventTitle,
                        )?.event;

                        if (event) {
                          window.location.href = `/events/${event.id}`;
                        }
                      }}
                    >
                      🎪 {eventTitle}
                    </h6>

                    {/* RESERVATIONS LIST */}
                    {resList.map((r: any) => (
                      <div
                        key={r.id}
                        className="ms-3 mb-2 p-2 bg-light rounded"
                      >
                        <strong>{r.parentName}</strong>
                        <div className="small text-muted">{r.email}</div>
                        <div>🪑 Table {r.tableNumber}</div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
