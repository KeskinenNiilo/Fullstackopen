import { useState } from 'react'

const Average = (props) => {
  return (props.good * 1 + props.bad * (-1)) / (props.good + props.neutral + props.bad)
}

const Positive = (props) => {
  return 100 * props.good / (props.good + props.neutral + props.bad) 
}

const Statistics = (props) => {
  return (
    <div>
      <p>average {<Average good={props.good} neutral={props.neutral} bad={props.bad}/>}</p>
      <p>positive {<Positive good={props.good} neutral={props.neutral} bad={props.bad}/>}%</p>
    </div>
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App