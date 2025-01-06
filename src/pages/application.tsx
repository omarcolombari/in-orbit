import { Dialog } from '../components/ui/dialog'
import { CreateGoal } from '../components/create-goal'
import { WeeklySummary } from '../components/weekly-summary'
import { useGetWeekSummary } from '../http/generated/api'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router'
import dayjs from 'dayjs'

export function Application() {
  const [searchParams] = useSearchParams()

  const weekStartAtParam = searchParams.get('week_starts_at')

  const weekStartsAt = weekStartAtParam
    ? new Date(weekStartAtParam)
    : new Date()

  const { data, isLoading } = useGetWeekSummary({
    weekStartsAt: dayjs(weekStartsAt).startOf('week').toISOString(),
  })

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="size-10 text-zinc-500 animate-spin" />
      </div>
    )
  }

  return (
    <Dialog>
      <WeeklySummary summary={data.summary} />

      <CreateGoal />
    </Dialog>
  )
}
