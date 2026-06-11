import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import AdminDashboard from "./pages/AdminDashboard";
import EventReservation from "./pages/EventReservation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/edit-events/:id" element={<EditEvent />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/reserve-event/:id" element={<EventReservation/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
