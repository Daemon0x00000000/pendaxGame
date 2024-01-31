import { useState } from 'react'
import './App.css'

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
    </>
  )
}

export default App
