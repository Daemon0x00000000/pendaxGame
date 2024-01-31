import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import GamePage from './components/Game'
// import stats from './components/stats'
import Nav from './components/nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
        <h1 style={{
            textAlign: 'center',
            fontSize: '4rem',
            color: 'white',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            marginTop: '5rem'
        }}>Pendax Game</h1>
        <BrowserRouter>
    <Nav/>
    <Routes>
      {/* <Route path="/game" element={<GamePage />} /> */}
      {/* <Route path="/stats" element={<StatsPage />} /> */}
      <Route path="*" element={
        <main><p>Page Error 404 !</p></main>
      } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
