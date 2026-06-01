import { GreetingCard } from './components/GreetingWidget'
import { WeatherWidget } from './components/WeatherWidget'
import { TodayWidget } from './components/TodayCalenderWidget'
import { TransitWidget } from './components/TransitWidget'
import { MealWidget } from './components/MealWidget'
import  ArsenalMatchWidget  from './components/ArsenalMatchWidget'
import PremierLeagueTableWidget from './components/PremierLeagueTable'
import PGATourWidget from './components/PGATourWidget'

import Footer from './components/Footer'



function App() {


  return (
    <>
      <main className="container max-w-7xl mx-auto">
        <GreetingCard />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 mx-5 lg:mx-4">
          <WeatherWidget />
          <TodayWidget />
          <TransitWidget />
          <MealWidget />
          <ArsenalMatchWidget />
          <PremierLeagueTableWidget />
          <PGATourWidget />
        </div>
 
    <Footer />
    </main>
    </>
  )
}

export default App
