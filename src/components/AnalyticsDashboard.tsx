'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

// Define the matrix data structure
interface TaskStatus {
  progress: number;
  completed: boolean;
  notes: string;
  assignee?: {
    id: string;
    name: string;
    role: string;
  };
}

interface MatrixData {
  [phase: string]: {
    [module: string]: TaskStatus;
  };
}

interface AnalyticsProps {
  matrixData: MatrixData;
}

interface AnalyticsData {
  value: number;
  change: number;
  label: string;
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export default function AnalyticsDashboard({ matrixData }: AnalyticsProps) {
  const phaseProgressChart = useRef<HTMLCanvasElement>(null)
  const moduleProgressChart = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Guard clause for empty matrixData
    if (!matrixData || Object.keys(matrixData).length === 0) {
      return
    }

    // Cleanup previous charts
    const phaseCtx = phaseProgressChart.current?.getContext('2d')
    const moduleCtx = moduleProgressChart.current?.getContext('2d')
    if (phaseCtx) {
      const phaseChart = Chart.getChart(phaseCtx)
      if (phaseChart) phaseChart.destroy()
    }
    if (moduleCtx) {
      const moduleChart = Chart.getChart(moduleCtx)
      if (moduleChart) moduleChart.destroy()
    }

    // Calculate phase progress
    const phaseProgress = Object.entries(matrixData).map(([phase, modules]: [string, Record<string, TaskStatus>]) => {
      const tasks = Object.values(modules)
      const validTasks = tasks.filter(task => task?.progress !== undefined)
      const progress = validTasks.length > 0
        ? validTasks.reduce((acc, task) => acc + (task.progress || 0), 0) / validTasks.length
        : 0
      return { phase, progress }
    })

    // Calculate module progress
    const firstPhase = Object.values(matrixData)[0] || {}
    const moduleProgress = Object.keys(firstPhase).map(module => {
      const phases = Object.values(matrixData) as any[]
      const validPhases = phases.filter(phase => phase[module]?.progress !== undefined)
      const progress = validPhases.length > 0
        ? validPhases.reduce((acc: number, phase: any) => acc + (phase[module]?.progress || 0), 0) / validPhases.length
        : 0
      return { module, progress }
    })

    // Create phase progress chart
    if (phaseProgressChart.current) {
      new Chart(phaseProgressChart.current, {
        type: 'bar',
        data: {
          labels: phaseProgress.map(p => p.phase),
          datasets: [{
            label: 'Phase Progress',
            data: phaseProgress.map(p => p.progress),
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      })
    }

    // Create module progress chart
    if (moduleProgressChart.current) {
      new Chart(moduleProgressChart.current, {
        type: 'radar',
        data: {
          labels: moduleProgress.map(m => m.module),
          datasets: [{
            label: 'Module Progress',
            data: moduleProgress.map(m => m.progress),
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      })
    }
  }, [matrixData])

  if (!matrixData || Object.keys(matrixData).length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
        <div className="text-gray-500">No data available yet. Start updating your event planning matrix to see analytics.</div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Phase Progress</h3>
          <canvas ref={phaseProgressChart}></canvas>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
          <canvas ref={moduleProgressChart}></canvas>
        </div>
      </div>
    </div>
  )
} 