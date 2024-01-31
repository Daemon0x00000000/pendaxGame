import { useState } from 'react'
import logo from './logo.png'; // Remplacez 'path_to_your_logo' par le chemin réel de votre image de logo
import './App.css'
import './styles/index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ErrorPage from './components/error'
import HomePage from './components/home'
// import GamePage from './components/Game'
// import stats from './components/stats'
import Nav from './components/nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <img src={logo} alt="Pendax Game" style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
            marginTop: '5rem'
        }} />
        <BrowserRouter>
    <Nav/>
    <Routes>
      {/* <Route path="/GamePage" element={<GamePage />} /> */}
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/stats" element={<StatsPage />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
