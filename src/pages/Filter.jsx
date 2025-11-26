import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUserHook";

const Filter = () => {
    useUser();
    return(
        <Dashboard activeMenu="Filter">
            This is the filter page
        </Dashboard>
    )
}

export default Filter;