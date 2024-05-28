import "./AddProperty.css";
import ComponentWrapper from "../../components/componentwrapper/ComponentWrapper.jsx";
import UploadImage from "../../components/upload_image/UploadImage.jsx";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../../Provider/StoreContext.jsx";

const AddProperty = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [description, setDescription] = useState("");
  const [area, setArea] = useState(0);
  const [price, setPrice] = useState(0);
  const [college, setCollege] = useState(false);
  const [hospital, setHospital] = useState(false);
  const [pet, setPet] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (
      !image ||
      !name ||
      !place ||
      !bedroom ||
      !bathroom ||
      !description ||
      !area ||
      !price
    ) {
      toast.error("Fields are needed!");
      return;
    }
    const url = import.meta.env.VITE_SERVER_URL;

    try {
      await axios.post(
        `${url}/addproperty`,
        {
          name,
          image,
          place,
          area,
          price,
          bathroom,
          bedroom,
          hospital,
          college,
          pet,
          description,
        },
        { withCredentials: true }
      );

      toast.success("Property is add successfully");

      navigate("/");
    } catch (error) {
      console.log("Something is wrong in property adding");
      toast.error("Something went wrong!");
    }
  };

  const handleImage = (url) => {
    setImage(url);
  };

  const { currentUser } = useStore();

  if (!currentUser) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="addP">
      <ComponentWrapper>
        <div className="addP_container">
          <h1>List your Property</h1>

          <div className="addP_listing">
            <p>Property image</p>

            {image ? (
              <img src={image} alt="property" className="addP_img" />
            ) : (
              <UploadImage handleImage={handleImage} />
            )}

            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="addP_details">
                {/* name */}
                <div className="addP_input">
                  <label htmlFor="p_name">Name</label>
                  <input
                    id="p_name"
                    className=""
                    type="text"
                    required
                    minLength={2}
                    maxLength={30}
                    title="Character should be between 2-30."
                    placeholder="Enter property name..."
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                  />
                </div>
                {/* Place */}
                <div className="addP_input">
                  <label htmlFor="p_place">Place</label>
                  <input
                    id="p_place"
                    className=""
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    title="Character should be between 2-100."
                    placeholder="Enter property place..."
                    value={place}
                    onChange={(e) => setPlace(e.currentTarget.value)}
                  />
                </div>
                {/* Area */}
                <div className="addP_input">
                  <label htmlFor="p_area">Area</label>
                  <input
                    id="p_area"
                    className=""
                    type="number"
                    required
                    title="Write the area"
                    placeholder="Enter property area..."
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      if (value >= 0) {
                        setArea(value);
                      }
                    }}
                    value={area}
                  />
                </div>
                {/* Bedroom */}
                <div className="addP_input">
                  <label htmlFor="p_bedroom">Bedroom</label>
                  <input
                    id="p_bedroom"
                    className=""
                    type="number"
                    required
                    title="Write the no. of bedroom"
                    placeholder="Enter total bedroom..."
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      if (value >= 0) {
                        setBedroom(value);
                      }
                    }}
                    value={bedroom}
                  />
                </div>
                {/* Bathroom */}
                <div className="addP_input">
                  <label htmlFor="p_bathroom">Bathroom</label>
                  <input
                    id="p_bathroom"
                    className=""
                    type="number"
                    required
                    title="Write the no. of bathroom"
                    placeholder="Enter total bathroom..."
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      if (value >= 0) {
                        setBathroom(value);
                      }
                    }}
                    value={bathroom}
                  />
                </div>
                {/* Price */}
                <div className="addP_input">
                  <label htmlFor="p_price">Price</label>
                  <input
                    id="p_price"
                    className=""
                    type="number"
                    required
                    title="Write the total price"
                    placeholder="Enter total price..."
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      if (value >= 0) {
                        setPrice(value);
                      }
                    }}
                    value={price}
                  />
                </div>
                {/* description */}
                <div className="addP_input">
                  <label htmlFor="p_description">Description</label>
                  <textarea
                    id="p_description"
                    className=""
                    required
                    title="Write the total description"
                    placeholder="Enter total description..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  ></textarea>
                </div>

                {/* hospitals */}
                <div className="addP_input_check">
                  <label htmlFor="p_hospitals">Nearby Hospitals</label>
                  <input
                    id="p_hospitals"
                    className=""
                    type="checkbox"
                    checked={hospital}
                    onChange={(e) => setHospital(e.currentTarget.checked)}
                  />
                </div>

                {/* colleges */}
                <div className="addP_input_check">
                  <label htmlFor="p_colleges">Nearby Colleges</label>
                  <input
                    id="p_colleges"
                    className=""
                    type="checkbox"
                    checked={college}
                    onChange={(e) => setCollege(e.currentTarget.checked)}
                  />
                </div>

                {/* pet allowed */}
                <div className="addP_input_check">
                  <label htmlFor="p_pet">Pet allowed</label>
                  <input
                    id="p_pet"
                    className=""
                    type="checkbox"
                    checked={pet}
                    onChange={(e) => setPet(e.currentTarget.checked)}
                  />
                </div>
              </div>
              <button type="submit">Add Property</button>
            </form>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default AddProperty;
