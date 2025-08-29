'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats } from '@/types/job'
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Target } from 'lucide-react'

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`
  const formatCurrency = (value?: number) => value ? `$${value.toLocaleString()}` : 'N/A'

  const cards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications.toString(),
      icon: Users,
      description: 'All time applications',
      trend: null,
    },
    {
      title: 'This Month',
      value: stats.applicationsThisMonth.toString(),
      icon: Calendar,
      description: 'Applications this month',
      trend: null,
    },
    {
      title: 'Interview Rate',
      value: formatPercentage(stats.interviewRate),
      icon: Target,
      description: 'Applications to interviews',
      trend: stats.interviewRate > 0.15 ? 'up' : 'down',
    },
    {
      title: 'Offer Rate',
      value: formatPercentage(stats.offerRate),
      icon: TrendingUp,
      description: 'Interviews to offers',
      trend: stats.offerRate > 0.1 ? 'up' : 'down',
    },
    {
      title: 'Average Salary',
      value: formatCurrency(stats.averageSalary),
      icon: DollarSign,
      description: 'Average offered salary',
      trend: null,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {card.trend && (
                <>
                  {card.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                </>
              )}
              {card.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
