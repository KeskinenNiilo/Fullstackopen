const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <Part name={props.part.name} exercises={props.part.exercises} />
  )
}

const Total = (props) => {
  let sum = 0
  for (let n of props.num) {
    sum += n.exercises
  }
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map(part => (
        <Content key={part.name} part={part} />
      ))}
      <Total num={course.parts} />
    </div>
  )
}

export default App