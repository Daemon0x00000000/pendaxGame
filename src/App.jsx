import {createContext, useState} from "react";
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import GamePage from './components/Game'
// import stats from './components/stats'
import Nav from './components/nav'
import {GamePage} from "./pages/GamePage.jsx";

export const StatsContext = createContext({})
function App() {
    // Create context for the game (Jeu du pendu)

    const [stats, setStats] = useState({
        scores: [
            // { name: 'John', score: 10 },
        ]
    })

  return (
    <StatsContext.Provider value={[stats, setStats]}>
        <BrowserRouter>
            <h1 style={{
                textAlign: 'center',
                fontSize: '4rem',
                color: 'white',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                marginTop: '5rem'
            }}>Pendax Game
            </h1>
            <Nav/>
            <Routes>
                <Route path="/game" element={<GamePage />} />
                {/* <Route path="/stats" element={<StatsPage />} /> */}
                <Route path="*" element={
                    <main><p>Page Error 404 !</p></main>
                }/>
            </Routes>
        </BrowserRouter>
    </StatsContext.Provider>
  )
}

export default App
