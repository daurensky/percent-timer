import BackgroundImage from './components/background-image'
import PercentTimer from './components/percent-timer'
import TimeSetForm from './components/time-set-form'
import { useTimeStore } from './store/use-time-store'

function App() {
  const { timeSettled } = useTimeStore()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm relative z-10">
        {timeSettled ? <PercentTimer /> : <TimeSetForm />}
      </div>
      <BackgroundImage />
    </div>
  )
}

export default App
