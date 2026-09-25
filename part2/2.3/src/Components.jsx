const Course = (props) => {
    const course = props.course
    const parts = course.parts
    return (
        <div>
            <h1>{course.name}</h1>
            {parts.map((part) => (
                <p>{part.name} {part.exercises}</p>
            ))}
            <h3>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h3>
        </div>
    )
}

export default Course