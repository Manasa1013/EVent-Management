import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyEvents.css'; 

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
          setError('No authentication token found. Please log in.');
          return;
        }

        // Fetch the registered events with Authorization header
        const response = await axios.get('http://localhost:5000/api/events/myevents', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        console.log(response);
        

        if (response.status === 200) {
          if(response.data.events.length === 0) {
            setMessage('No events found for this user.');
            setEvents([]); // Clear events if none found
            setError(''); // Clear error message
          }
          else if(response.data.events.length > 0) {
            setMessage('');
            console.log(response.data.events);
            setEvents(response.data.events); // Store the events in state
            setError(''); // Clear error message

          }
        } else {
          setMessage('');
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        setError('An error occurred while fetching your events.');
        setMessage('');
        console.error(err);
      }
    };

    fetchMyEvents();
  }, []);

  if (error) return <p className="error-message">{error}</p>;
  if (events.length === 0) return <p className='success-message white'>{message}</p>;
  
  return (
    <>
    
    
    <div className="my-events-container">
      <h1 className='rcenter'>My Registered Events</h1>
      
      <div className="event-list">
        
        
        {/* Map through the events and display them */}
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <div className="event-image-container">
              {/* Example image, replace with actual image data if available */}
              <img src={event.image} alt={event.title} className="event-image" />
            </div>
            <div className="event-content">
            <h1 >{event.title}</h1>
            <p className='white'>{event.description}</p>
            <p className='white'>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
            <p className='white'>Location: {event.location}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MyEvents;
