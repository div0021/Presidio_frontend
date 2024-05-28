import { useCallback, useEffect, useState } from "react";
import ComponentWrapper from "../componentwrapper/ComponentWrapper";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStore } from "../../Provider/StoreContext";
import { MdOutlineAddHome } from "react-icons/md";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showUser,setShowUser] = useState(false);

  const { currentUser, addCurrentUser,removeCurrentUser } = useStore();

  useEffect(() => {
    const getCurrentUser = async () => {
      const url = import.meta.env.VITE_SERVER_URL;

      try {
        const user = await axios.get(`${url}/me`, { withCredentials: true });
        addCurrentUser(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  const handleLogOut = useCallback(async () => {
    const url = import.meta.env.VITE_SERVER_URL;

    try{
        await axios.get(`${url}/logout`, { withCredentials: true });
        removeCurrentUser();
        toast.success("Logout Successfully");
        navigate("/");
    }catch(error){
        console.log("Something went wrong in logout");
    }

  },[])
  return (
    <nav className="navbar_container">
      <ComponentWrapper>
        <div className="navbar_box">
          <div className="navbar_subbox1">
            
            <h4 onClick={()=>navigate("/")}>Rentify</h4>

            <div className="navbar_searchbar">
              <CiSearch className="navbar_icons" />
              <input type="text" placeholder="Search..." className="" />
            </div>
          </div>
          <div className="navbar_subbox2">
            <button className="navbar_property" onClick={() => navigate("/addproperty")}>
              <MdOutlineAddHome className="navbar_icons" />
              <span>List home</span>
            </button>
         {!currentUser && (
            <>  <button
              className="navbar_signup"
              onClick={() => navigate("/signup")}
            >
              <span>Signup</span>
            </button>
            <button
              className="navbar_signup"
              onClick={() => navigate("/login")}
            >
              <span>Login</span>
            </button></>)}

            {currentUser && (
                <div className="navbar_user" title={currentUser.name} onMouseEnter={()=>setShowUser(true)} onMouseLeave={()=>setShowUser(false)}>
                   <img src="/placeholder.png" alt="placeholder"/>

                   <div className="navbar_user_options" data-show={showUser ? "true" : "false"}>
                   <p>List house</p>
                   <p>Interested house</p>
                   <p onClick={handleLogOut}>logout</p>
                   </div>
                </div>
            )}

            <span className="navbar_hamburger" onClick={() => setOpen(true)}>
              <RxHamburgerMenu className="navbar_icons" />
            </span>

            <div
              className="navbar_hamburger_drawer"
              data-visible={open ? "true" : "false"}
            >
              <div className="navbar_hamburger_drawer_subbox1">
                <RxCross1
                  className="navbar_icons navbar_icons_cross"
                  onClick={() => setOpen(false)}
                />
                <p className="navbar_hamburger_property">
                  <Link
                    to="/addproperty"
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    List home
                  </Link>
                </p>
               {!currentUser && (<> <p>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </Link>
                </p>
                <p>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Signup
                  </Link>
                </p></>)}
              </div>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </nav>
  );
};

export default Navbar;
