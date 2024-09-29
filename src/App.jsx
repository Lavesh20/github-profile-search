import { useState } from 'react'

import './App.css'
import GitHubSearch from './components/GitHubSearch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <GitHubSearch/>
    </>
  )
}

export default App
