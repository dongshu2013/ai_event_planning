'use client'

import Link from 'next/link'
// import { useState } from 'react'
import EventOverview from '@/components/EventOverview'
import AIChatWindow from '@/components/AIChatWindow'

interface NavigationCard {
  href: string;
  title: string;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {
    href: '/schedule',
    title: 'Event Schedule',
    description: 'Manage your event timeline and schedule'
  },
  {
    href: '/marketing',
    title: 'Marketing Materials',
    description: 'Event introduction, branding, and format'
  },
  {
    href: '/vendors',
    title: 'Vendor Management',
    description: 'Venue, catering, and security details'
  },
  {
    href: '/speakers',
    title: 'Speaker Management',
    description: 'Speaker profiles and confirmations'
  },
  {
    href: '/attendees',
    title: 'Attendee Management',
    description: 'Registration and subscriptions'
  },
  {
    href: '/partners',
    title: 'Partner Management',
    description: 'Co-hosts, community and media partners'
  },
  {
    href: '/sponsors',
    title: 'Sponsor Management',
    description: 'Sponsorship tiers and tracking'
  }
]

export default function Home() {
  const handleNewModule = () => {
    alert('Module creation coming soon!')
  }

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
        {navigationCards.map((card) => (
          <Link 
            key={card.href}
            href={card.href} 
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}

        <button 
          className="p-6 border rounded-lg hover:shadow-lg transition-shadow border-dashed flex items-center justify-center"
          onClick={handleNewModule}
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
