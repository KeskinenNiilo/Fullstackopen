const Course = (props) => {
  return (
    <div>
      {props.courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <h3>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h3>
        </div>
      ))}
    </div>
  )
}

export default Course