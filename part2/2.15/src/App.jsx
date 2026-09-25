import { useEffect, useState } from 'react'
import { getAll, create, update, deletePerson, Notification, SuccessNotification } from './services'
import './style.css'

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with{' '}
        <input
          value={props.newFiltered}
          onChange={props.setNewFiltered}
        />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:{' '}
        <input
          value={props.newName}
          onChange={props.setNewName}
        />
      </div>

      <div>
        phone:{' '}
        <input
          value={props.newPhone}
          onChange={props.setNewPhone}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFiltered, setNewFiltered] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    getAll( {setError: setErrorMessage} ).then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      setErrorMessage(`Person ${newName} already exists.`)
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }
    if (persons.some(person => person.number === newPhone)) {
      setErrorMessage(`${newPhone} is already in use`)
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }

    if (!newName.trim() || !newPhone.trim()) return

    setSuccess(`Added ${newName}`)
    create({ newPerson: {name: newName, number: newPhone}, setError: setErrorMessage}).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')
    })
    setTimeout(() => setSuccess(null), 5000)
  }

  const visiblePersons = persons.filter(person =>
    person.name?.toLowerCase().includes(newFiltered?.toLowerCase() ?? "")
  )

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (!person) return

    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson( {id, setError: setErrorMessage} ).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        newFiltered={newFiltered}
        setNewFiltered={event => setNewFiltered(event.target.value)}
      />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={event => setNewName(event.target.value)}
        newPhone={newPhone}
        setNewPhone={event => setNewPhone(event.target.value)}
        addPerson={addPerson}
      />
      <Notification message={errorMessage}/>
      <SuccessNotification message={success}/>

      <h2>Numbers</h2>

      <Persons persons={visiblePersons} deletePerson={handleDeletePerson} />
    </div>
  )
}

export default App