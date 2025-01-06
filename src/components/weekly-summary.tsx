import { ArrowLeft, ArrowRight, CheckCircle2, LogOut, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'
import type { GetWeekSummary200Summary } from '../http/generated/api'
import { UserProfile } from './user-profile'
import { UserLevel } from './user-level'
import { useSearchParams } from 'react-router'

dayjs.locale(ptBR)

interface WeeklySummaryProps {
  summary: GetWeekSummary200Summary
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const weekStartAtParam = searchParams.get('week_starts_at')

  const weekStartsAt = weekStartAtParam
    ? new Date(weekStartAtParam)
    : new Date()

  const firstDayOfWeek = dayjs(weekStartsAt)
    .startOf('week')
    .format('D[ de ]MMM')
  const lastDayOfWeek = dayjs(weekStartsAt).endOf('week').format('D[ de ]MMM')

  const completedPercentage = summary.total
    ? Math.round((summary.completed * 100) / summary.total)
    : 0

  function handlePreviousWeek() {
    const params = new URLSearchParams(searchParams)

    params.set(
      'week_starts_at',
      dayjs(weekStartsAt).subtract(7, 'days').toISOString()
    )

    setSearchParams(params)
  }

  function handleNextWeek() {
    const params = new URLSearchParams(searchParams)

    params.set(
      'week_starts_at',
      dayjs(weekStartsAt).add(7, 'days').toISOString()
    )

    setSearchParams(params)
  }

  const isCurrentWeek = dayjs(weekStartsAt).endOf('week').isAfter(new Date())

  return (
    <main className="max-w-[600px] py-10 px-5 mx-auto flex flex-col gap-6">
      <header className="bg-zinc-900 rounded-xl px-4 py-3 shadow-shape flex items-center justify-between">
        <UserProfile />
        <UserLevel />
      </header>
      <div className="px-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InOrbitIcon />
            <span className="text-lg font-semibold">
              {firstDayOfWeek} - {lastDayOfWeek}
            </span>
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePreviousWeek}
                variant="secondary"
                size="icon"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                disabled={isCurrentWeek}
                onClick={handleNextWeek}
                variant="secondary"
                size="icon"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <DialogTrigger asChild>
            <Button disabled={!isCurrentWeek} size="sm">
              <Plus className="size-4" />
              Cadastrar meta
            </Button>
          </DialogTrigger>

          <Button size="sm">
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <Progress value={summary.completed} max={summary.total ?? 1}>
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>
              Você completou{' '}
              <span className="text-zinc-100">{summary.completed}</span> de{' '}
              <span className="text-zinc-100">{summary.total ?? 0}</span> metas
              nessa semana
            </span>
            <span>{completedPercentage}%</span>
          </div>
        </div>

        <Separator />

        {isCurrentWeek && <PendingGoals />}

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {summary.goalsPerDay &&
            Object.entries(summary.goalsPerDay).map(([date, goals]) => {
              const weekDay = dayjs(date).format('dddd')
              const formattedDate = dayjs(date).format('D[ de ]MMMM')

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    <span className="capitalize">{weekDay}</span>{' '}
                    <span className="text-zinc-400 text-xs">
                      ({formattedDate})
                    </span>
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {goals.map(goal => {
                      const time = dayjs(goal.completedAt).format('HH:mm')
                      return (
                        <li key={goal.id} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm text-zinc-400">
                            Você completou{' '}
                            <span className="text-zinc-100">
                              "{goal.title}"
                            </span>{' '}
                            às <span className="text-zinc-100">{time}</span>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )
}
