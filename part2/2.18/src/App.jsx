import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/name/finland")
    .then((res) => res.json())
    .then((json) => {
      setItems(json)
      setDataLoaded(true)
    })
  }, [])
  return (
    <div>
      <p>{dataLoaded ? 'Loaded' : 'Not loaded'}</p>
    </div>
  )
}

export default App
