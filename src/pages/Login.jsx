import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import { LoaderCircle } from "lucide-react";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import AppContext from "../context/AppContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {setUserProfile} = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (!email.trim()) {
            setError("Please enter a valid email.");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password.");
            setIsLoading(false);
            return;
        }

        setError(null);

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {email, password});
            const {token, userProfile} = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUserProfile(userProfile);
                console.log("USER SETEADO:", userProfile);
                toast.success("Successfully logged in!");
                navigate("/product");
            }
        } catch (error) {
            console.error("Something went wrong", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <div className="h-screen w-full grid grid-cols-5 overflow-hidden">
                <div className="w-full h-full col-span-2">
                    <img src={assets.loginBg} alt="background_image" className="w-full h-full object-cover filter"/>
                </div>
                <div className="w-full h-screen flex items-center justify-center bg-[#717866] col-span-3">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto w-[60%] flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-semibold text-black text-center mb-2">
                            Login
                        </h3>
                        <p className="text-sm text-[#949488] text-center mb-8">
                            Please enter your credentials to log in
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4 w-[70%]">
                            <Input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="name@email.com"
                                type="text"
                            />
                            <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="********"
                                type="password"
                            />
                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button type="submit" className={`w-full py-2 text-lg font-medium bg-[#717866] rounded-lg text-white hover:bg-[#505746] hover:cursor-pointer flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>

                            <p className="text-sm text-[#949488] text-center mt-6">
                                Don't have an account?{" "}
                                <Link to="/register" className="font-medium text-primary hover:text-[#505746] transition-colors">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;