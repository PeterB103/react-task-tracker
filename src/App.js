import React from 'react'
import { useState } from 'react'
import Header from './components/Header' //imports the header from components folder
import Tasks from './components/Tasks' 
import AddTask from './components/AddTask' 

//1. Use <Header /> to add in the header component 
//2. Passes in a property into the component < Header title = 'Hello'/> 
//Function implementation for a components

//Creating a use state array of task objects (state is immutable, one way data)
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false) 
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30 pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30 pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Grocery Shopping',
      day: 'Feb 5th at 2:30 pm',
      reminder: false,
    },
  ])

  //Add Task
  const addTask = (task) => {
    //gives a random number
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks( [ ...tasks, newTask])
  }
  //Delete a Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = (id) => {
    //console.log(id) //use to check that function was working properly
    //if id's match then copy all data and only flip reminder
    //else just leave task how it is
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
    
  }

  //&& is a shorter way to do a turnnary operator without an else
  return ( //whatever you return has to be a single element
    <div className= "container">
      <Header onAdd = { () => 
        setShowAddTask(!showAddTask)
      }
      showAdd = {showAddTask}
      />
      {showAddTask && <AddTask onAdd = {addTask} />}
      {tasks.length > 0 ? (
       <Tasks tasks={tasks}
        onDelete= {deleteTask}
        onToggle= {toggleReminder} /> 
      ) : (
        'All tasks are completed'
        )}
    </div>
  );
}

//Class implementation for a componenent
// class App extends React.Component{
//   render(){
//     return <h1> Hello from a class </h1>
//   }
// }

export default App;
