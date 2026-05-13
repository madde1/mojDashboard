import { GreetingCard } from './components/GreetingWidget'
import { WeatherWidget } from './components/weatherWidget'
import Footer from './components/Footer'



function App() {


  return (
    <>
      <main className="container max-w-7xl mx-auto">
        <GreetingCard />
        <div className="grid gap-4 md:grid-cols-4 mt-4">
          <WeatherWidget />
        </div>
 
    <Footer />
    </main>
    </>
  )
}

export default App
