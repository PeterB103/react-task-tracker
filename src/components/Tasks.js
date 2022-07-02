import React from 'react'
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
    //returning a task map
    return (
        <>
            {tasks.map((task) => (
                //outputting the component and passing the task as a property
                <Task key={task.id} 
                task = {task}
                onDelete = {onDelete} 
                onToggle = {onToggle}/> 
            ))}
        </>
    )
}

export default Tasks