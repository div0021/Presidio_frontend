import { Link, useNavigate } from "react-router-dom";
import ComponentWrapper from "../../components/componentwrapper/ComponentWrapper";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const url = import.meta.env.VITE_SERVER_URL;

    if (password !== confirmPassword) {
      toast.error("confirm password and password should match each other");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${url}/signup`, {
        firstname,
        lastname,
        phone,
        email,
        password,
        confirmPassword,
      });
      toast.success("Signup Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="">
      <ComponentWrapper>
        <div className="register_container">
          <div className="register_box">
            <h2 className="">Signup</h2>
            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* First Name */}
              <div className="register_input">
                <label htmlFor="firstname" className="">
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  className=""
                  placeholder="Enter your firstname..."
                  title="First should contains 3-25 characters only."
                  minLength={3}
                  maxLength={25}
                  required
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstname(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>

              {/* Last Name */}
              <div className="register_input">
                <label htmlFor="lastname" className="">
                  LastName
                </label>
                <input
                  id="lastname"
                  type="text"
                  className=""
                  placeholder="Enter your lastname..."
                  title="lastname should contains 2-25 characters only."
                  minLength={2}
                  maxLength={25}
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="register_input">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className=""
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>
              {/* Phone number */}
              <div className="register_input">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className=""
                  type="tel"
                  required
                  pattern="\d{10}"
                  title="Please enter a valid 10-digit phone number"
                  placeholder="Enter your phone..."
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>

              {/* password */}
              <div className="register_input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}"
                  title="Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                  required
                  minLength={6}
                  maxLength={25}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>

              {/* confirm password */}

              <div className="register_input">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="password"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}"
                  title="Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                  required
                  minLength={6}
                  maxLength={25}
                  placeholder="Enter your confirm password..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>

              <div className="register_button">
                <button type="submit" disabled={loading} className="">
                  Submit
                </button>
              </div>
            </form>

            <div className="register_separator" />

            <div className="register_already">
              <p>Already have an account?</p> <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default Signup;
