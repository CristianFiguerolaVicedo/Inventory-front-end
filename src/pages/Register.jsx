import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import { LoaderCircle } from "lucide-react";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ProfileImageSelector from "../components/ProfileImageSelector";
import {uploadProfileImage} from "../util/uploadProfileImage";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        setIsLoading(true);

        if (!name.trim()) {
            setError("Please enter your name.");
            setIsLoading(false);
            return;
        }

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
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {name, email, password, profileImageUrl});
            if (response.status === 201) {
                toast.success("Successfully registered!.");
                navigate("/login");
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
                            Create an account
                        </h3>
                        <p className="text-sm text-[#949488] text-center mb-8">
                            Keep an eye on your inventory thanks to this app
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4 w-[70%]">
                            <div className="flex justify-center mb-6">
                                <ProfileImageSelector 
                                    image={profilePhoto}
                                    setImage={setProfilePhoto}
                                />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <Input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="Name"
                                    placeholder="Name Surname"
                                    type="text"
                                />
                                <Input 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                    placeholder="name@email.com"
                                    type="text"
                                />
                                <div className="col-span-2">
                                    <Input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Password"
                                        placeholder="********"
                                        type="password"
                                    />
                                </div>
                            </div>
                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button type="submit" className={`w-full py-2 text-lg font-medium bg-[#717866] rounded-lg text-white hover:bg-[#505746] hover:cursor-pointer flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Signing up...
                                    </>
                                ) : (
                                    "Sign up"
                                )}
                            </button>

                            <p className="text-sm text-[#949488] text-center mt-6">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-primary hover:text-[#505746] transition-colors">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;