import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Event {
  id: number | string;
  title: string;
  description: string;
  location: string;
  date: string;
  availableTables?: number;
  totalTables?: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="mb-3 event-card">
      <Card.Body className="text-start p-3">

        <Card.Title className="event-title mb-1">
          {event.title}
        </Card.Title>

        <Card.Text className="event-text mb-1">
          {event.description}
        </Card.Text>

        <Card.Text className="event-text mb-1">
          📍 {event.location}
        </Card.Text>

        <Card.Text className="event-text mb-1">
          🗓 {new Date(event.date).toDateString()}
        </Card.Text>

        <Card.Text className="event-text mb-2">
          🎟 Tables: {event.availableTables ?? event.totalTables}
        </Card.Text>

        <Link
          to={`/reserve-event/${event.id}`}
          className="text dark text-muted fw-bold event-link mb-2 d-block text-decoration-none"
        >
          View Details
        </Link>

      </Card.Body>
    </Card>
  );
};

export default EventCard;