import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const DeleteCategoryForm = ({onDeleteCategory, initialCategoryData}) => {
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialCategoryData) {
            setCategoryId(initialCategoryData);
        } else {
            setCategoryId("");
        }
    }, [initialCategoryData]);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await onDeleteCategory(categoryId);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="p-4">
            <h2 className="text-[#505746]">Are you sure you want to delete this category?</h2>

            <div className="flex justify-end mt-6">
                <button disabled={loading} onClick={() => handleSubmit(categoryId)} type="button" className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] font-semibold hover:cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Deleting...
                        </>
                    ) : (
                        <>
                            Delete Category
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteCategoryForm;