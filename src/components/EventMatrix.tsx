'use client'

import { useState } from 'react'
import { MatrixData, TeamMember } from '@/types/matrix'
import { teamMembers } from '@/data/teamMembers'

interface TaskStatus {
  completed: boolean
  notes: string
  assignee?: TeamMember
  progress: number // 0-100
  lastUpdated?: string
}

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

interface EventMatrixProps {
  onDataChange: (data: MatrixData) => void;
}

export default function EventMatrix({ onDataChange }: EventMatrixProps) {
  const [matrixData, setMatrixData] = useState<MatrixData>(() => {
    const initialData: MatrixData = {}
    phases.forEach(phase => {
      initialData[phase] = {}
      modules.forEach(module => {
        initialData[phase][module] = {
          completed: false,
          notes: '',
          progress: 0
        }
      })
    })
    return initialData
  })

  const [selectedCell, setSelectedCell] = useState<{phase: string, module: string} | null>(null)

  const handleCellClick = (phase: string, module: string) => {
    setSelectedCell({ phase, module })
  }

  const updateTaskStatus = (updates: Partial<TaskStatus>) => {
    if (!selectedCell) return

    const newData = {
      ...matrixData,
      [selectedCell.phase]: {
        ...matrixData[selectedCell.phase],
        [selectedCell.module]: {
          ...matrixData[selectedCell.phase][selectedCell.module],
          ...updates,
          lastUpdated: new Date().toISOString()
        }
      }
    }
    
    setMatrixData(newData)
    onDataChange(newData)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress > 0) return 'bg-orange-500'
    return 'bg-gray-200'
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Event Planning Matrix</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {phases.map(phase => (
                <th key={phase} className="border p-2 bg-gray-100">
                  {phase}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map(module => (
              <tr key={module}>
                <td className="border p-2 font-semibold bg-gray-50">{module}</td>
                {phases.map(phase => {
                  const cell = matrixData[phase][module]
                  return (
                    <td
                      key={`${phase}-${module}`}
                      className="border p-2 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(phase, module)}
                    >
                      <div className="h-20 flex flex-col gap-2">
                        {cell.assignee && (
                          <div className="text-sm text-gray-600">
                            {cell.assignee.name}
                          </div>
                        )}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${getProgressColor(cell.progress)} h-2 rounded-full transition-all`}
                            style={{ width: `${cell.progress}%` }}
                          />
                        </div>
                        {cell.completed && (
                          <span className="text-green-500">✓</span>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h3 className="text-xl font-semibold mb-4">
              {selectedCell.module} - {selectedCell.phase}
            </h3>
            
            <div className="mb-4">
              <label className="block mb-2">Assigned To</label>
              <select
                value={matrixData[selectedCell.phase][selectedCell.module].assignee?.id || ''}
                onChange={(e) => {
                  const member = teamMembers.find(m => m.id === e.target.value)
                  updateTaskStatus({ assignee: member })
                }}
                className="w-full border rounded p-2"
              >
                <option value="">-- Unassigned --</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Progress ({matrixData[selectedCell.phase][selectedCell.module].progress}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={matrixData[selectedCell.phase][selectedCell.module].progress}
                onChange={(e) => updateTaskStatus({ progress: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <input
                type="checkbox"
                checked={matrixData[selectedCell.phase][selectedCell.module].completed}
                onChange={(e) => updateTaskStatus({ completed: e.target.checked })}
                className="mr-2"
              />
              Completed
            </div>

            <div className="mb-4">
              <label className="block mb-2">Notes</label>
              <textarea
                value={matrixData[selectedCell.phase][selectedCell.module].notes}
                onChange={(e) => updateTaskStatus({ notes: e.target.value })}
                className="w-full border rounded p-2"
                rows={4}
              />
            </div>

            {matrixData[selectedCell.phase][selectedCell.module].lastUpdated && (
              <div className="text-sm text-gray-500 mb-4">
                Last updated: {new Date(matrixData[selectedCell.phase][selectedCell.module].lastUpdated!).toLocaleString()}
              </div>
            )}

            <button
              onClick={() => setSelectedCell(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 