import "./PropertyItem.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PropertyItem = ({
  id,
  bedroom,
  image,
  price,
  name,
  description,
  bathroom,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="propertyitem_container"
      onClick={() => navigate(`/property/${id}`)}
    >
      <div className="propertyitem_heading">
        <img src={image} style={{ width: "100%" }} />
        <h3>{name}</h3>
        <p>{description.substring(0, 70)}...</p>
        <div className="property_detail">
          <p>₹{price} -</p>
          <p>{bedroom} BHK -</p>
          <p>{bathroom} BATH</p>
        </div>
      </div>
    </div>
  );
};

PropertyItem.propTypes = {
  bedroom: PropTypes.number.isRequired,
  bathroom: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default PropertyItem;
