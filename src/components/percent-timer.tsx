import { useTimeStore } from '@/store/use-time-store'
import { differenceInSeconds, parse } from 'date-fns'
import { Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'

export default function PercentTimer() {
  const formatter = new Intl.RelativeTimeFormat('ru', { numeric: 'always' })

  const { start, end, setTimeSettled } = useTimeStore()

  const [percent, setPercent] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculate = () => {
      const now = new Date()
      const parsed = {
        start: parse(start, 'HH:mm', now),
        end: parse(end, 'HH:mm', now),
      }

      const totalSeconds = differenceInSeconds(parsed.end, parsed.start)
      const remainingSeconds = Math.max(0, differenceInSeconds(parsed.end, now))

      const percentLeft = (remainingSeconds / totalSeconds) * 100
      setPercent(Math.floor(Math.min(percentLeft, 100)))

      const remainingMinutes = Math.ceil(remainingSeconds / 60)

      const hoursLeft = remainingMinutes / 60
      setHours(Math.floor(hoursLeft))

      const minutesLeft = remainingMinutes % 60
      setMinutes(minutesLeft)
    }

    calculate()
    setLoading(false)
    const interval = setInterval(calculate, 1_000)

    return () => clearInterval(interval)
  }, [start, end])

  useEffect(() => {
    document.title = `${percent}% до конца дня`
  }, [percent])

  const handleTimeClick = () => {
    setTimeSettled(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">До конца дня осталось</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {loading ? (
          <>
            <Skeleton className="h-[60px] w-full" />
            <Skeleton className="h-[24px] w-full" />
          </>
        ) : (
          <>
            <p className="text-6xl text-center">{percent}%</p>
            <p className="text-center text-muted-foreground">
              {hours > 0 &&
                formatter.format(hours, 'hour').replace('через ', '')}{' '}
              {formatter.format(minutes, 'minute').replace('через ', '')}
            </p>
          </>
        )}
        <button
          type="button"
          className="inline-flex gap-2 items-center justify-center text-sm text-muted-foreground underline-offset-4 hover:underline"
          onClick={handleTimeClick}
        >
          с {start} до {end}
          <Edit size={14} />
        </button>
      </CardContent>
    </Card>
  )
}
