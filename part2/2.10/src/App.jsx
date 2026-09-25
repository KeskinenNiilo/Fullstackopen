import { useState } from 'react'

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with <input value ={props.newFiltered} onChange ={props.setNewFiltered}/>
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
     <div>
      name: <input value={props.newName} onChange={props.setNewName}/>
     </div>
    <div>
       phone: <input value={props.newPhone} onChange={props.setNewPhone}/>
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
      {props.persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "0451231236"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (persons.some(person => person.number === newPhone)) {
      alert(`${newPhone} is already in use`)
      return
    }
    if (!newName.replace(/\s/g, '').length || !newPhone.replace(/\s/g, '').length) return
    setPersons(persons.concat({ name : newName, number: newPhone}))
    setNewName('')
    setNewPhone('')
  }

  const [newFiltered, setNewFiltered] = useState('')
  const visiblePersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFiltered.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFiltered={newFiltered} setNewFiltered={event => setNewFiltered(event.target.value)}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={event => setNewName(event.target.value)} newPhone={newPhone} setNewPhone={event => setNewPhone(event.target.value)} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={visiblePersons} />
    </div>
  )
}

export default App