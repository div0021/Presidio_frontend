import PropTypes from "prop-types";
import "./ComponentWrapper.css"
const ComponentWrapper = ({children}) => {
  return (
    <div className="wrapper">
         <div className="wrapper_component">
           {children}
         </div>
    </div>
  )
}
ComponentWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default ComponentWrapper