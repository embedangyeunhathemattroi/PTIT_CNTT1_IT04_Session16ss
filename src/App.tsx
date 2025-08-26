import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Ex1Subject from './components/Ex1Subject'
import Ex2Login from './components/Ex2Login'
import Color from './components/Ex3.tsx/Color'
import Ex4 from './components/Ex4'
import Ex6 from './components/Ex6'
import B5 from './components/B5'
import B7 from './components/B7'
import B8 from './components/B8'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Ex1Subject></Ex1Subject>
      <Ex2Login></Ex2Login>
      <Color></Color>
      <Ex4></Ex4>
      <Ex6></Ex6>
      <B5></B5>
      <B7></B7>
      <B8></B8>
    </>
  )
}

export default App
