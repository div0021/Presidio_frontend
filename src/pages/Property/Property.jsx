import { useParams } from "react-router-dom";
import "./Property.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Property = () => {
  const { id } = useParams();

  const [propertyItem, setPropertyItem] = useState({});

  useEffect(() => {
    const getProperty = async () => {
      const url = import.meta.env.VITE_SERVER_URL;
      try {
        const response = await axios.get(`${url}/propertybyid/${id}`, {
          withCredentials: true,
        });

        setPropertyItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProperty();
  }, []);

  if (!propertyItem) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="property_container">
      <div className="property_contentbox">
        <h1>{propertyItem.name}</h1>

        <img src={propertyItem.image} style={{ width: "100%" }} />

        <p>{propertyItem.description}</p>
      </div>
    </div>
  );
};

export default Property;
