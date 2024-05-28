// import { useState } from "react";
import ComponentWrapper from "../../components/componentwrapper/ComponentWrapper";
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PropertyItem from "../../components/propertyItem/PropertyItem.jsx";

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const url = import.meta.env.VITE_SERVER_URL;

      try {
        const response = await axios.get(`${url}/allProperties`);

        setProperties(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getProperties();
  }, []);


  return (
    <ComponentWrapper>
      <div className="home_contentbox">
        <div className="home_recentProperties">
          <h2>Recent Properties</h2>

          {/* Properties */}
          <div className="home_grid">
            {properties.length > 0 &&
              properties.map((property) => {
                return (
                  <PropertyItem
                    key={property._id}
                    id={property._id}
                    name={property.name}
                    bathroom={property.bathroom}
                    bedroom={property.bedroom}
                    description={property.description}
                    image={property.image}
                    price={property.price}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default HomePage;
