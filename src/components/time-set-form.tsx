import { useTimeStore } from '@/store/use-time-store'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { FormEvent, useState } from 'react'

export default function TimeSetForm() {
  const { start, end, setTime, setTimeSettled } = useTimeStore()
  const [values, setValues] = useState({ start, end })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTime(values.start, values.end)
    setTimeSettled(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Укажите часы</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="start">Начало</Label>
              <Input
                id="start"
                type="time"
                required
                value={values.start}
                onChange={e =>
                  setValues(prev => ({ ...prev, start: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="end">Конец</Label>
              <Input
                id="end"
                type="time"
                required
                value={values.end}
                onChange={e =>
                  setValues(prev => ({ ...prev, end: e.target.value }))
                }
              />
            </div>

            <Button type="submit" className="w-full">
              Сохранить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
