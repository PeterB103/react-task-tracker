import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header"; //imports the header from components folder
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

//1. Use <Header /> to add in the header component
//2. Passes in a property into the component < Header title = 'Hello'/>
//Function implementation for a components

//Creating a use state array of task objects (state is immutable, one way data)
const App = () => {
  //showAddTask is the actual variable, setShowAddTask is the function we can use to modify variabele's state
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        //Tells the server how the request is encoded (Must do b/c working with JSON)
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Request: Sending over the task object type
        content: task.text,
        day: task.day,
        reminder: task.reminder,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data); //incorrect way to set data (data) => [...tasks, data]
      })
      .catch((error) => tasks);
  };
  

  // const getData = async(task) => {
  //  const y = await fetch("http://localhost:5000/", {
  //     method: "POST",
  //     headers: {
  //       //Tells the server how the request is encoded (Must do b/c working with JSON)
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       //Request: Sending over the task object type
  //       content: task.text,
  //       day: task.day,
  //       reminder: task.reminder,
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .then(
  //     //request was successful
  //     (data) => [...tasks, data] //returning newTask and updating the state w/ newTask
  //   )
  //   .catch((error) => tasks);
  //   return y
  // }

  //Delete a Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    //Back end implementation (Needed to communicate with the backend to delete the task)
    fetch(`http://localhost:5000/delete/${id}`, {
      //${id} is used to format the string
      method: "DELETE",
      headers: {
        //Tells the server how the request is encoded (Must do b/c working with JSON)
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        //request was successful
        (data) =>
          function() {
            setTasks([...tasks, data]); //returning newTask and updating the state w/ newTask
          }
      )
      .catch((error) => console.log(error));
  };

  //Toggle reminder
  const toggleReminder = (id) => {
    //console.log(id) //use to check that function was working properly
    //if id's match then copy all data and only flip reminder
    //else just leave task how it is
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  useEffect(() => {
    fetch("http://localhost:5000/").then(
      (res) =>
        res.json().then((data) => {
          setTasks(data);
        }) //convert the response to data
    );
  }, []);
  //&& is a shorter way to do a turnnary operator without an else
  return (
    //whatever you return has to be a single element
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "All tasks are completed"
      )}
    </div>
  );
};

//Class implementation for a componenent
// class App extends React.Component{
//   render(){
//     return <h1> Hello from a class </h1>
//   }
// }

export default App;
