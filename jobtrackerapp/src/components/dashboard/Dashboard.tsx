'use client'

import { useState, useMemo } from 'react'
import { DashboardFilters, FilterState } from './DashboardFilters'
import { StatsCards } from './StatsCards'
import { ApplicationCharts } from './ApplicationCharts'
import { JobApplication, DashboardStats } from '@/types/job'
import { BarChart3, Filter as FilterIcon } from 'lucide-react'

interface DashboardProps {
  applications?: JobApplication[]
}

// Mock data for demonstration - replace with real data from your backend
const mockApplications: JobApplication[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Software Engineer',
    status: 'applied',
    appliedDate: '2024-01-15',
    location: 'Mountain View, CA',
    salary: 150000,
    jobType: 'full-time',
    source: 'linkedin',
    notes: 'Applied through LinkedIn',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Frontend Developer',
    status: 'interviewing',
    appliedDate: '2024-01-10',
    location: 'Seattle, WA',
    salary: 140000,
    jobType: 'full-time',
    source: 'company-website',
    notes: 'First round interview scheduled',
    lastUpdated: '2024-01-12',
  },
  {
    id: '3',
    company: 'Apple',
    position: 'iOS Developer',
    status: 'offer',
    appliedDate: '2024-01-05',
    location: 'Cupertino, CA',
    salary: 160000,
    jobType: 'full-time',
    source: 'referral',
    notes: 'Received offer letter',
    lastUpdated: '2024-01-20',
  },
  {
    id: '4',
    company: 'Amazon',
    position: 'Backend Engineer',
    status: 'rejected',
    appliedDate: '2024-01-08',
    location: 'Seattle, WA',
    jobType: 'full-time',
    source: 'indeed',
    notes: 'Rejected after technical interview',
    lastUpdated: '2024-01-18',
  },
  {
    id: '5',
    company: 'Meta',
    position: 'React Developer',
    status: 'applied',
    appliedDate: '2024-01-20',
    location: 'Menlo Park, CA',
    jobType: 'full-time',
    source: 'linkedin',
    notes: 'Applied for React position',
    lastUpdated: '2024-01-20',
  },
  {
    id: '6',
    company: 'Netflix',
    position: 'Full Stack Developer',
    status: 'interviewing',
    appliedDate: '2024-01-12',
    location: 'Los Gatos, CA',
    salary: 170000,
    jobType: 'full-time',
    source: 'company-website',
    notes: 'Second round interview',
    lastUpdated: '2024-01-19',
  },
  {
    id: '7',
    company: 'Uber',
    position: 'Mobile Developer',
    status: 'withdrawn',
    appliedDate: '2024-01-03',
    location: 'San Francisco, CA',
    jobType: 'full-time',
    source: 'glassdoor',
    notes: 'Withdrew application',
    lastUpdated: '2024-01-15',
  },
  {
    id: '8',
    company: 'Airbnb',
    position: 'DevOps Engineer',
    status: 'pending',
    appliedDate: '2024-01-25',
    location: 'San Francisco, CA',
    jobType: 'contract',
    source: 'other',
    notes: 'Application under review',
    lastUpdated: '2024-01-25',
  },
]

export function Dashboard({ applications = mockApplications }: DashboardProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    jobType: 'all',
    source: 'all',
    dateRange: 'all',
  })

  // Filter applications based on current filters
  const filteredApplications = useMemo(() => {
    let filtered = applications

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status)
    }

    // Filter by job type
    if (filters.jobType !== 'all') {
      filtered = filtered.filter(app => app.jobType === filters.jobType)
    }

    // Filter by source
    if (filters.source !== 'all') {
      filtered = filtered.filter(app => app.source === filters.source)
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date()
      let cutoffDate = new Date()
      
      switch (filters.dateRange) {
        case '7days':
          cutoffDate.setDate(now.getDate() - 7)
          break
        case '30days':
          cutoffDate.setDate(now.getDate() - 30)
          break
        case '90days':
          cutoffDate.setDate(now.getDate() - 90)
          break
      }
      
      filtered = filtered.filter(app => new Date(app.appliedDate) >= cutoffDate)
    }

    return filtered
  }, [applications, filters])

  // Calculate dashboard stats
  const stats: DashboardStats = useMemo(() => {
    const totalApplications = applications.length
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    
    const applicationsThisMonth = applications.filter(app => {
      const appDate = new Date(app.appliedDate)
      return appDate.getMonth() === thisMonth && appDate.getFullYear() === thisYear
    }).length

    const interviewingApps = applications.filter(app => app.status === 'interviewing').length
    const offerApps = applications.filter(app => app.status === 'offer').length
    
    const interviewRate = totalApplications > 0 ? interviewingApps / totalApplications : 0
    const offerRate = interviewingApps > 0 ? offerApps / interviewingApps : 0

    const salaries = applications
      .filter(app => app.salary)
      .map(app => app.salary!)
    
    const averageSalary = salaries.length > 0 
      ? salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length 
      : undefined

    return {
      totalApplications,
      applicationsThisMonth,
      interviewRate,
      offerRate,
      averageSalary,
    }
  }, [applications])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Job Application Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Track your job search progress and insights
            </p>
          </div>
        </div>

        {/* Filters */}
        <DashboardFilters onFiltersChange={setFilters} />

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Charts */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Analytics & Insights
            </h2>
          </div>
          <ApplicationCharts applications={filteredApplications} />
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Filtered Results:</span>
              <span className="ml-2 text-gray-600">{filteredApplications.length} applications</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Active Filters:</span>
              <span className="ml-2 text-gray-600">
                {Object.values(filters).filter(f => f !== 'all').length} applied
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>
              <span className="ml-2 text-gray-600">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
