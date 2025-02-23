'use client'

import { useState } from 'react'

interface EventDetails {
  title: string
  date: string
  location: string
  description: string
}

export default function EventOverview() {
  const [isEditing, setIsEditing] = useState(false)
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    title: 'Tech Innovation Summit 2024',
    date: '2024-06-15',
    location: 'Silicon Valley Convention Center',
    description: 'A groundbreaking tech conference focusing on AI innovations and future trends.'
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="grid gap-4">
            <input
              type="text"
              value={eventDetails.title}
              onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
              className="border p-2 rounded"
              placeholder="Event Title"
            />
            <input
              type="date"
              value={eventDetails.date}
              onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={eventDetails.location}
              onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
              className="border p-2 rounded"
              placeholder="Location"
            />
            <textarea
              value={eventDetails.description}
              onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
              className="border p-2 rounded"
              placeholder="Event Description"
              rows={3}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">{eventDetails.title}</h2>
          <p className="text-gray-600">📅 {eventDetails.date}</p>
          <p className="text-gray-600">📍 {eventDetails.location}</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-600"
        >
          Edit
        </button>
      </div>
      <p className="text-gray-700">{eventDetails.description}</p>
    </div>
  )
} 