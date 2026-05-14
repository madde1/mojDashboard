import { GreetingCard } from './components/GreetingWidget'
import { WeatherWidget } from './components/weatherWidget'
import { TodayWidget } from './components/TodayCalenderWidget'
import { TransitWidget } from './components/TransitWidget'
import Footer from './components/Footer'



function App() {


  return (
    <>
      <main className="container max-w-7xl mx-auto">
        <GreetingCard />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mx-4">
          <WeatherWidget />
          <TodayWidget />
          <TransitWidget />
        </div>
 
    <Footer />
    </main>
    </>
  )
}

export default App
