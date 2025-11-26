import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUserHook";

const Product = () => {
    useUser();
    return(
        <div>
            <Dashboard activeMenu="Products">
                This is the product page
            </Dashboard>
        </div>
    )
}

export default Product;