// THIS IS OUR LOGIN PAGE
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuthentication } from "./UserProvider";
import { baseURL } from "../constants/const";

export const Login = () => {
    // Storing the username form the login input
    const [userProfile, setUserprofile] = useState(null);
    const [product, setProduct] = useState(null);
    const [islogin, setIslogin] = useState(false);

    const [password, setPassword] = useState(null);
    const Authentication = useAuthentication();
    const navigate = useNavigate();
    const location = useLocation();
    // if the path is set on the state object then use the same as the redirected path
    const redirectPath = location.state?.path || "/";

    // Here we need to call our api here for authentication....

    const handleLogin = () => {
        // Base check if the user has entered the username
        // calling the login context from UserContextProvider

        // To use useEffect enable this
        // setIslogin(!islogin);
        if (userProfile) {
            console.log("User Profile");
            Authentication.profileLogin(userProfile);
            //once we set the username we navigate the user to the respective pages
            navigate("/profile", { replace: true });
        }

        // It will redirect the user to the respective route
        if (product) {
            console.log("Product");
            Authentication.productLogin(product);
            //once we set the username we navigate the user to the respective pages
            navigate("/products", { replace: true });
        }

        // Authentication.profileLogin(product);
        //once we set the username we navigate the user to the respective pages
        // navigate("/profile" , {replace : true});
        // After loggedIn when when we press the back button it will redirect us to login page again if we don't put
        // {replace : true}
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `${baseURL}/sec/auth/login`,
                JSON.stringify(data),
                { Accept: "Application/json" },
            );
            
            localStorage.setItem("access_token", response?.data?.response?.access_token);
            localStorage.setItem('Patient_SUID' ,response?.data?.response?.suid );

            console.log("RESPONSE : ", response?.data?.response?.access_token);

            Authentication.profileLogin("asd");
            navigate("/profile", { replace: true });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        if (islogin === true) {
            fetchData();
        }
    }, [islogin]);

    return (
        <>
            <div>
                <h1>profile login</h1>
                <label>
                    username :{" "}
                    <input type="text" onChange={(e) => setUserprofile(e.target.value)}></input>
                </label>
                <input type="button" onClick={handleLogin}>
                    {islogin ? "Logout" : "Login"}
                </input>
            </div>

            <br></br>

            <div>
                <h1>Product login</h1>
                <label>
                    username :{" "}
                    <input type="text" onChange={(e) => setProduct(e.target.value)}></input>
                </label>
                <input type="button" onClick={handleLogin}>
                    Login
                </input>
            </div>
        </>
    );
};
