'use client'

import Link from 'next/link'
import { useState } from 'react'
import EventOverview from '@/components/EventOverview'
import AIChatWindow from '@/components/AIChatWindow'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tech Event Planner AI</h1>
        <p className="text-xl text-gray-600 mb-8">Your AI-powered event planning assistant</p>
        
        {/* Event Overview Section */}
        <EventOverview />

        {/* Add this button just below the header section */}
        <div className="mb-8 flex justify-end">
          <Link 
            href="/matrix" 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            View Planning Matrix
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event Management Sections */}
        <Link href="/schedule" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Event Schedule</h2>
          <p className="text-gray-600">Manage your event timeline and schedule</p>
        </Link>

        <Link href="/marketing" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Marketing Materials</h2>
          <p className="text-gray-600">Event introduction, branding, and format</p>
        </Link>

        <Link href="/vendors" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Vendor Management</h2>
          <p className="text-gray-600">Venue, catering, and security details</p>
        </Link>

        <Link href="/speakers" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Speaker Management</h2>
          <p className="text-gray-600">Speaker profiles and confirmations</p>
        </Link>

        <Link href="/attendees" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Attendee Management</h2>
          <p className="text-gray-600">Registration and subscriptions</p>
        </Link>

        <Link href="/partners" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Partner Management</h2>
          <p className="text-gray-600">Co-hosts, community and media partners</p>
        </Link>

        <Link href="/sponsors" className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Sponsor Management</h2>
          <p className="text-gray-600">Sponsorship tiers and tracking</p>
        </Link>

        {/* Add New Module Card */}
        <button 
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow border-dashed flex items-center justify-center"
          onClick={() => alert('Module creation coming soon!')}
        >
          <div className="text-center">
            <span className="text-4xl block mb-2">+</span>
            <h2 className="text-2xl font-semibold">Add New Module</h2>
          </div>
        </button>
      </div>

      {/* AI Chat Component */}
      <AIChatWindow />
    </main>
  )
}
