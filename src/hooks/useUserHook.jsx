import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

const useUser = () => {
    const {userProfile, setUserProfile, clearUser} = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (userProfile) {
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

                if (isMounted && response.data) {
                    setUserProfile(response.data);
                }
            } catch (error) {
                console.log("Failed to fetch the user information", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted = false;
        }
    }, [setUserProfile, clearUser, navigate, userProfile]);
}

export default useUser;