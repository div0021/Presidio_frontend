import { Link, useNavigate } from "react-router-dom"
import ComponentWrapper from "../../components/componentwrapper/ComponentWrapper";
import "./Login.css"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const url = import.meta.env.VITE_SERVER_URL;

        setLoading(true);
        try{
            await axios.post(`${url}/login`,{
                email,password
            },{withCredentials:true});
            toast.success("login Successfully!");
            setTimeout(()=>{
                navigate("/");
            },1000);

        }catch(error){
            toast.error("Credential are wrong");
            console.log(error);
        }
        setLoading(false);
    }

  return (
    <div className="">
    <ComponentWrapper>
        <div className="login_container">
            <div className="login_box">
            <h2 className="">
                Login
            </h2>
            <form className="" onSubmit={(e)=>{
                e.preventDefault();
                handleSubmit();
            }}>
               

             {/* Email */}
                <div className="login_input">
                <label htmlFor="email">Email</label>
                    <input id="email" className="" type="email" required placeholder="Enter your email..." value={email} onChange={(e)=>setEmail(e.currentTarget.value)} disabled={loading} />
                    </div>

                {/* password */}
                <div className="login_input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}" title="Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." required minLength={6} maxLength={25} placeholder="Enter your password..."  value={password} onChange={(e)=>setPassword(e.currentTarget.value)} disabled={loading} />


                    </div>

                <div className="login_button">
                <button type="submit" disabled={loading} className="">
                    Submit
                </button>

                </div>
            </form>

            <div className="login_separator" />

            <div className="login_account">
            <p>New User?</p> <Link to="/signup">Signup</Link>


            </div>
            </div>
        </div>
    </ComponentWrapper>
    </div>
  )
}

export default Login;