import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUserHook";

const Category = () => {
    useUser();
    return(
        <Dashboard activeMenu="Categories">
            This is the category page
        </Dashboard>
    )
}

export default Category;