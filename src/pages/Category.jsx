import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUserHook";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORIES);
            if (response.status === 200) {
                console.log(response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong. Please try again later.", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const {name} = category;

        if (!name.trim()) {
            toast.error("Category name is required.");
            return;
        }

        const isDuplicated = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if (isDuplicated) {
            toast.error("This category already exists!");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name});
            if (response.status === 201) {
                toast.success("Category added successfully!");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error adding category", error);
            toast.error(error.response?.data?.message || "Failed to add category.");
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name} = updatedCategory;

        if (!name.trim()) {
            toast.error("Category name is required.");
            return;
        }

        if (!id) {
            toast.error("Category id is missing for update.");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name});
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully!");
            fetchCategoryDetails();
        } catch (error) {
            console.error("Error updating category", error);
            toast.error(error.response?.data?.message || "Failed to update category.");
        }
    }

    return(
        <Dashboard activeMenu="Categories">
            <div className="my-5 mx-auto">
                {/*Add button */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold text-[#505746]">Categories</h2>
                    <button onClick={() => setOpenAddCategoryModal(true)} className="flex items-center gap-1 bg-[#949488] rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2">
                        <Plus size={20}/>
                        Add Category
                    </button>
                </div>
                {/*Category List */}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                {/*Adding category modal */}
                <Modal
                    title="Add Category"
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>

                {/*Updating category modal */}
                <Modal
                    title="Edit Category"
                    isOpen={openEditCategoryModal}
                    onClose={() => {setOpenEditCategoryModal(false), setSelectedCategory(null)}}
                >
                    <AddCategoryForm onAddCategory={handleUpdateCategory} isEditing={true} initialCategoryData={selectedCategory}/>
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Category;