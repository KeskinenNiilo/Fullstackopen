import { useState, useEffect } from 'react'
import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weather_url = (city) => {
  return `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${city}&aqi=no`
}

const CountrySpecific = ({ country }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(weather_url(country.capital[0]))
      .then(response => setWeather(response.data))
      .catch(error => console.log(error))
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages || {}).map(lan => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        style={{ width: '300px', height: 'auto' }}
      />
      <h1>Weather in {country.capital[0]}</h1>
      <p>Temperature {weather?.current.temp_c} Celsius</p>
      <img src={weather?.current.condition.icon} style={{ width: '150px', height: 'auto' }} />
      <p>Wind {weather?.current.wind_kph} km/h</p>
    </div>
  )
}

const Filtered = ({ filtered }) => {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelected(null)
  }, [filtered])

  if (filtered.length >= 10) {
    return <div>Too many countries</div>
  }

  if (filtered.length === 1) {
    return <CountrySpecific country={filtered[0]} />
  }

  return (
    <div>
      <ul>
        {filtered.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setSelected(country)}>Show</button>
          </li>
        ))}
      </ul>

      {selected && <CountrySpecific country={selected} />}
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(url).then(response => {
      setCountries(response.data)
    })
  }, [])

  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <Filtered filtered={filtered} />
    </div>
  )
}

export default App