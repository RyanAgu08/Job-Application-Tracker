export interface JobApplication {
  id: string
  company: string
  position: string
  status: JobStatus
  appliedDate: string
  location: string
  salary?: number
  jobType: JobType
  source: ApplicationSource
  notes?: string
  lastUpdated: string
}

export type JobStatus = 
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'withdrawn'
  | 'pending'

export type JobType = 
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'internship'
  | 'freelance'

export type ApplicationSource = 
  | 'linkedin'
  | 'indeed'
  | 'company-website'
  | 'referral'
  | 'glassdoor'
  | 'other'

export interface DashboardStats {
  totalApplications: number
  applicationsThisMonth: number
  interviewRate: number
  offerRate: number
  averageSalary?: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}
