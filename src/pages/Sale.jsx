import { useEffect, useState } from "react";
import useUser from "../hooks/useUserHook";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Dashboard from "../components/Dashboard";
import SaleOverview from "../components/SaleOverview";
import SaleList from "../components/SaleList";
import Modal from "../components/Modal";
import AddSaleForm from "../components/AddSaleForm";
import DeleteAlert from "../components/DeleteAlert";

const Sale = () => {
    useUser();

    const [saleData, setSaleData] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddSaleModal, setOpenAddSaleModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const fetchSaleDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_SALES);
            if (response.status === 200) {
                console.log(response.data);
                setSaleData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch sale details", error);
            toast.error(error.response?.data?.message || "Failed to fetch sales details");
        } finally {
            setLoading(false);
        }
    }

    const fetchProductDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch product details", error);
            toast.error(error.response?.data?.message || "Failed to fetch product details");
        }
    }

    const handleAddSale = async (sale) => {
        const {date, iva, sent, contract, packaging, sendingFees, productionFees, details} = sale;

        const today = new Date().toISOString().split("T")[0];

        if (!date || date > today) {
            toast.error("Please enter a valid date");
            return;
        }

        if (iva === null || iva === undefined) {
            toast.error("Please enter a valid option for IVA");
            return
        }

        if (sent === null || sent === undefined) {
            toast.error("Please enter a valid option for Sent");
            return
        }

        if (contract === null || contract === undefined) {
            toast.error("Please enter a valid option for Contract");
            return
        }

        if (!packaging || isNaN(packaging) || Number(packaging) <= 0) {
            toast.error("Please enter a valid number for packaging");
            return
        }

        if (!sendingFees || isNaN(sendingFees) || Number(sendingFees) <= 0) {
            toast.error("Please enter a valid number for sending feed");
            return
        }

        if (!productionFees || isNaN(productionFees) || Number(productionFees) <= 0) {
            toast.error("Please enter a valid number for production fees");
            return
        }

        if (!details || details.length === 0) {
            toast.error("You must add at least one product");
            return;
        }

        for (const item of details) {
            if (!item.productId || item.quantity <= 0) {
                toast.error("Invalid product data");
                return;
            }
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_SALE, {
                date, 
                iva, 
                sent, 
                contract, 
                packaging: Number(packaging), 
                sendingFees: Number(sendingFees), 
                productionFees: Number(productionFees), 
                details
            });

            if (response.status === 201) {
                setOpenAddSaleModal(false);
                toast.success("Sale added successfully!");
                fetchProductDetails();
                fetchSaleDetails();
            }
        } catch (error) {
            console.error("Failed to add sale", error);
            toast.error(error.response?.data?.message || "Failed to add sale");
        }
    }

    const deleteSale = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_SALE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Sale deleted successfully!");
            fetchSaleDetails();
        } catch (error) {
            console.error("Failed to delete sale details", error);
            toast.error(error.response?.data?.message || "Failed to delete sale details");
        }
    }

    useEffect(() => {
        fetchSaleDetails();
        fetchProductDetails();
    }, []);

    return(
        <div>
            <Dashboard activeMenu="Sales">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <SaleOverview 
                                sales={saleData}
                                onAddSale={() => setOpenAddSaleModal(true)}
                            />
                        </div>

                        <SaleList 
                            sales={saleData}
                            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        />

                        <Modal
                            isOpen={openAddSaleModal}
                            onClose={() => setOpenAddSaleModal(false)}
                            title="Add Sale"
                        >
                            <AddSaleForm 
                                onAddSale={(sale) => handleAddSale(sale)}
                                products={products}
                            />
                        </Modal>

                        <Modal
                            isOpen={openDeleteAlert.show}
                            onClose={() => setOpenDeleteAlert({show: false, data: null})}
                            title="Delete Sale"
                        >
                            <DeleteAlert
                                content="Are you sure you want to delete this sale?"
                                onDelete={() => deleteSale(openDeleteAlert.data)}
                            />
                        </Modal>
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Sale;