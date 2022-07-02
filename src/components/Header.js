import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

// // Creating a component with a simple header
// const Header = () => {
//   return (
//     <div>
//       <h1> Task Tracker </h1>
//     </div>
//   )
// }

// // Creating a component with a simple header 
// const Header = (props) => {
//   return (
//     <div>
//       <h1> {props.title} </h1>
//     </div>
//   )
// }

// // Creating a component with a simple header destructured w/ inline style
// const Header = ( {title}) => {
//   return (
//     <div>
//       <h1 style = {{ color: 'red', backgroundColor : 'black'}}> {title} </h1>
//     </div>
//   )
// }

// // Creating a component with a simple header destructured w/ style object
// //Useful for dynamic style
// const Header = ({title}) => {
//     return (
//       <div>
//         <h1 style = {headingStyle}> {title} </h1>
//       </div>
//     )
//   }


// Creating a component with a simple header destructured w/ external css style
//Onclick is an event and the {onClick} is the function name 
const Header = ({ title, onAdd, showAdd }) => {

  return (
    <header className='header' >
      <h1> {title} </h1>
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd} />
    </header>

  )

}
//Sets up default props of a component when no props are passed
Header.defaultProps = {
  title: 'Task Tracker by Peter',
};

//Set up prop types
Header.propTypes = {
  //Helps catch errors before they happen
  title: PropTypes.string.isRequired,
}

// //Creation of style object (CSS in JS)
// const headingStyle = {
//     color: 'red', 
//     backgroundColor : 'black'
// }

export default Header

