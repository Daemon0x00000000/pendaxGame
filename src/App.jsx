import {createContext, useState} from "react";
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import GamePage from './components/Game'
// import stats from './components/stats'
import Nav from './components/nav'
import ErrorPage from './components/error'
import HomePage from './components/home'
import {GamePage} from "./pages/GamePage.jsx";

function App() {
    const [stats, setStats] = useState({
        scores: [
            // { name: 'John', score: 10 },
        ]
    })
  return (
      <StatsContext.Provider value={[stats, setStats]}>
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
                <Route path="/game" element={<GamePage />} />
                <Route path="/home" element={<HomePage />} />
                {/* <Route path="/stats" element={<StatsPage />} /> */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
      </StatsContext.Provider>
  )
}

export default App
