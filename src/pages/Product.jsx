import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import ProductOverview from "../components/ProductOverview";
import useUser from "../hooks/useUserHook";
import ProductList from "../components/ProductList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddProductForm from "../components/AddProductForm";
import DeleteAlert from "../components/DeleteAlert";

const Product = () => {
    useUser();

    const [productData, setProductData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const VALID_STATUS = ["IN_STOCK", "SOLD_OUT", "COMING_SOON"];

    const fetchProductDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_PRODUCTS);

            if (response.status === 200) {
                setProductData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch product details", error);
            toast.error(error.response?.data?.message || "Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    }

    const fetchProductCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORIES);

            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch categories");
        }
    }

    const handleAddProduct = async (product) => {
        const {name, stock, production_price, packaging, pvp, status, notes, categoryId} = product;

        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!stock || isNaN(stock) || Number(stock) <= 0) {
            toast.error("Please enter a valid stock number");
            return;
        }

        if (!production_price || isNaN(production_price) || Number(production_price) <= 0) {
            toast.error("Please enter a valid production price number");
            return;
        }

        if (!packaging || isNaN(packaging) || Number(packaging) <= 0) {
            toast.error("Please enter a valid packaging price number");
            return;
        }

        if (!pvp || isNaN(pvp) || Number(pvp) <= 0) {
            toast.error("Please enter a valid pvp number");
            return;
        }

        if (!VALID_STATUS.includes(status)) {
            toast.error("Invalid status value");
            return;
        }

        if (!categoryId) {
            toast.error("You have to select a category");
            return;
        }

        try {
            console.log("Producto para add", product);
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_PRODUCT, {
                name,
                packaging: Number(packaging),
                productionPrice: Number(production_price),
                pvp: Number(pvp),
                stock: Number(stock),
                status,
                notes,
                categoryId
            });

            if (response.status === 201) {
                setOpenAddProductModal(false);
                toast.success("Product added successfully!");
                fetchProductDetails();
                fetchProductCategories();
            }
        } catch (error) {
            console.error("Failed to add the product", error);
            toast.error(error.response?.data?.message || "Failed to add the product");
        }
    }

    const deleteProduct = async (id) => {
        try{
            await axiosConfig.delete(API_ENDPOINTS.DELETE_PRODUCT(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Product deleted successfully!");
            fetchProductDetails();
        } catch (error) {
            console.error("Failed to delete the product", error);
            toast.error(error.response?.data?.message || "Failed to delete the product");
        }
    }

    const handleDownloadProductDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.DOWNLOAD_PRODUCT_DETAILS, {responseType: "blob"});
            let filename = "product_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Product details downloaded successfully!");
        } catch (error) {
            console.error("Error downloading product details", error);
            toast.error(error.response?.data?.message || "Failed to download product details.");
        }
    }

    useEffect(() => {
        fetchProductDetails();
        fetchProductCategories();
    }, []);

    return(
        <div>
            <Dashboard activeMenu="Products">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <ProductOverview onAddProduct={() => setOpenAddProductModal(true)}/>
                        </div>

                        <ProductList 
                            products={productData}
                            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                            onDownload={handleDownloadProductDetails}
                            categories={categories}
                        />

                        <Modal
                            isOpen={openAddProductModal}
                            onClose={() => setOpenAddProductModal(false)}
                            title="Add Product"
                        >
                            <AddProductForm 
                                onAddProduct={(product) => handleAddProduct(product)}
                                categories={categories}
                            />
                        </Modal>

                        <Modal
                            isOpen={openDeleteAlert.show}
                            onClose={() => setOpenDeleteAlert({show: false, data: null})}
                            title="Delete Product"
                        >
                            <DeleteAlert 
                                content="Are you sure you want to delete this product?"
                                onDelete={() => deleteProduct(openDeleteAlert.data)}
                            />
                        </Modal>
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Product;