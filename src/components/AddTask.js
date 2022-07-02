import React from 'react'
import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    //setBlank is default to update a string
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const onSubmit = (e) => {
        //information is not actually sent to a form
        e.preventDefault()

        //error checking
        if(!text){
            alert('Please add a task')
            return
        }

        onAdd ({text, day, reminder})

        //sets settings of form back to default when submitted
        setText('')
        setDay('')
        setReminder(false)
    }
  return (
    <form classNaem = 'add-form' onSubmit = {onSubmit}>
        <div className = 'form-control'>
        <label> Task </label>
        <input type = 'test' placeholder = 'Add Task' value = {text} 
        onChange = { (e) => setText(e.target.value) } />
        </div>

        <div className = 'form-control'>
        <label> Day & Time </label>
        <input type = 'test' placeholder = 'Add Day & Time' value = {day} 
        onChange = { (e) => setDay(e.target.value) }/>
        </div>

        <div className = 'form-control form-control-check'>
        <label> Set Reminder </label>
        <input type = 'checkbox' value = {reminder} checked = {reminder}
        onChange = { (e) => setReminder(e.currentTarget.checked) }/>
        </div>

        <input type = 'submit' value = 'Save Task' className = 'btn btn-block' />
    </form>
  )
}

export default AddTask