import { GreetingCard } from './components/GreetingWidget'
import { WeatherWidget } from './components/weatherWidget'
import { TodayWidget } from './components/TodayCalenderWidget'
import Footer from './components/Footer'



function App() {


  return (
    <>
      <main className="container max-w-7xl mx-auto">
        <GreetingCard />
        <div className="grid gap-4 md:grid-cols-3 mt-4">
          <WeatherWidget />
          <TodayWidget />
        </div>
 
    <Footer />
    </main>
    </>
  )
}

export default App
