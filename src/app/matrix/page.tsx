'use client'

import { useState } from 'react'
import EventMatrix from '@/components/EventMatrix'
import TeamDashboard from '@/components/TeamDashboard'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import Link from 'next/link'

const phases = ['Initiation', 'Preparation', 'Coordination', 'Recap']
const modules = [
  'Event Basic Info',
  'Team Setup',
  'Marketing Materials',
  'Vendors',
  'Speakers',
  'Partners',
  'Sponsors',
  'Attendees'
]

// Initialize matrix data structure
const initializeMatrixData = () => {
  const data: MatrixData = {}
  phases.forEach(phase => {
    data[phase] = {}
    modules.forEach(module => {
      data[phase][module] = {
        completed: false,
        notes: '',
        progress: 0
      }
    })
  })
  return data
}

export default function MatrixPage() {
  const [activeTab, setActiveTab] = useState('matrix')
  const [matrixData, setMatrixData] = useState(initializeMatrixData())

  const tabs = [
    { id: 'matrix', label: 'Planning Matrix' },
    { id: 'team', label: 'Team Dashboard' },
    { id: 'analytics', label: 'Analytics' }
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Event Planning Dashboard</h1>
        <Link 
          href="/"
          className="text-blue-500 hover:text-blue-600"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-6">
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {activeTab === 'matrix' && <EventMatrix onDataChange={setMatrixData} />}
      {activeTab === 'team' && <TeamDashboard matrixData={matrixData} />}
      {activeTab === 'analytics' && <AnalyticsDashboard matrixData={matrixData} />}
    </div>
  )
} 