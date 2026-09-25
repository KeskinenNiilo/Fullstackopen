import { useState } from 'react'

const Average = (props) => {
  return Math.round(10*(props.good * 1 + props.bad * (-1)) / (props.good + props.neutral + props.bad)) / 10
}

const Positive = (props) => {
  return Math.round(1000 * props.good / (props.good + props.neutral + props.bad)) / 10 
}

const Statistics = (props) => {
  if (props.good < 1 && props.neutral < 1 && props.bad < 1) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tr>
        <th>average</th>
        <th>{<Average good={props.good} neutral={props.neutral} bad={props.bad}/>}</th>
      </tr>
      <tr>
        <th>positive</th>
        <th>{<Positive good={props.good} neutral={props.neutral} bad={props.bad}/>}%</th>
      </tr>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick = {() => setGood(good + 1)}>good</button>
      <button onClick = {() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick = {() => setBad(bad + 1)}>bad</button>
      <table>
        <tr>
          <th>good</th>
          <th>{good}</th>
        </tr>
        <tr>
          <th>neutral</th>
          <th>{neutral}</th>
        </tr>
        <tr>
          <th>bad</th>
          <th>{bad}</th>
        </tr>
      </table>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App