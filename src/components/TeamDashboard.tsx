'use client'

import { useState } from 'react'

interface TeamMember {
  id: string
  name: string
  role: string
  tasks: TaskInfo[]
}

interface TaskInfo {
  phase: string
  module: string
  progress: number
  completed: boolean
  notes: string
  dueDate?: string
}

const teamMembers: TeamMember[] = [
  { 
    id: '1', 
    name: 'Alice Johnson', 
    role: 'Event Lead',
    tasks: []  // This will be populated from matrix data
  },
  // ... other team members
]

export default function TeamDashboard({ matrixData }: { matrixData: any }) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  // Process matrix data to get tasks per member
  const processedTeamMembers = teamMembers.map(member => {
    const tasks: TaskInfo[] = []
    Object.entries(matrixData).forEach(([phase, modules]: [string, any]) => {
      Object.entries(modules).forEach(([module, task]: [string, any]) => {
        if (task.assignee?.id === member.id) {
          tasks.push({
            phase,
            module,
            progress: task.progress,
            completed: task.completed,
            notes: task.notes,
            dueDate: task.dueDate
          })
        }
      })
    })
    return { ...member, tasks }
  })

  const getMemberProgress = (tasks: TaskInfo[]) => {
    if (tasks.length === 0) return 0
    return Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Team Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedTeamMembers.map(member => (
          <div 
            key={member.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedMember(member.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{getMemberProgress(member.tasks)}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Assigned Tasks:</span> {member.tasks.length}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Completed:</span> {member.tasks.filter(t => t.completed).length}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">
                {processedTeamMembers.find(m => m.id === selectedMember)?.name}'s Tasks
              </h3>
              <button 
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {processedTeamMembers
                .find(m => m.id === selectedMember)
                ?.tasks.map((task, index) => (
                  <div key={index} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{task.module}</h4>
                        <p className="text-sm text-gray-600">{task.phase}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{task.progress}%</div>
                        {task.completed && (
                          <span className="text-green-500">✓ Complete</span>
                        )}
                      </div>
                    </div>
                    {task.notes && (
                      <p className="text-sm text-gray-600 mt-2">{task.notes}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 