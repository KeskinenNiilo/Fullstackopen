import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getAll = ( {setError} ) => {
  return axios.get(baseUrl).then(response => response.data)
  .catch(error => {
    setError(error.response?.data?.error || error.message || 'Something happened.')
    return []
  })
}

export const create = ( {newPerson, setError} ) => {
  return axios.post(baseUrl, newPerson).then(response => response.data)
  .catch(error => {
    setError(error.response?.data?.error || error.message || 'Something happened.')
    return
  })
}

export const update = ( {id, newPerson, setError} ) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data)
  .catch(error => {
    setError(error.response?.data?.error || error.message || 'Something happened.')
    return
  })
}

export const deletePerson = ( {id, setError} ) => {
  return axios.delete(`${baseUrl}/${id}`)
  .catch(error => {
    setError(error.response?.data?.error || error.message || 'Something happened.')
    return
  })
}

export const Notification = ( {message} ) => {
  if (!message) return null

  return (
    <div className="error">
      {message}
    </div>
  )
}

export const SuccessNotification = ( {message} ) => {
  if (!message) return null;
  return (
    <div className='success'>
      {message}
    </div>
  )
}