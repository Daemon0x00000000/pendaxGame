import {createContext, useEffect, useState} from "react";
import './App.css'
import './styles/index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import GamePage from './components/Game'
// import stats from './components/stats'
import Nav from './components/nav'
import ErrorPage from './components/error'
import HomePage from './components/home'
import {GamePage} from "./pages/GamePage.jsx";
import logo from './logo.png'
import {StatsPage} from "./pages/StatsPage.jsx";

export const StatsContext = createContext({})
function App() {
    const [stats, setStats] = useState(() => {
        const localData = localStorage.getItem('stats')
        return localData ? JSON.parse(localData) : {scores:[]}
    })

    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        if (!firstRender) {
            localStorage.setItem('stats', JSON.stringify(stats))
            console.log('stats updated')
        } else {
            setFirstRender(false)
        }
    }, [stats,firstRender]);

  return (
      <StatsContext.Provider value={[stats, setStats]}>
          <img src={logo} alt="Pendax Game" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
              marginTop: '5rem'
          }}/>
          <BrowserRouter>
              <Nav/>
              <Routes>
                  <Route path="/game" element={<GamePage/>}/>
                  <Route path="/home" element={<HomePage/>}/>
                  <Route path="/stats" element={<StatsPage />} />
                  <Route path="*" element={<ErrorPage/>}/>
              </Routes>
          </BrowserRouter>
      </StatsContext.Provider>
  )
}

export default App
