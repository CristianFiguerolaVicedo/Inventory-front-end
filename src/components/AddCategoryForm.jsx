import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react";
import FormInput from "./FormInput";

const AddCategoryForm = ({onAddCategory, isEditing, initialCategoryData}) => {
    const [category, setCategory] = useState({
        name: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({name: ""});
        }
    }, [isEditing, initialCategoryData]);

    const handleChange = (key, value) => {
        setCategory({...category, [key]: value})
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="p-4">
            <FormInput 
                value={category.name}
                onChange={({target}) => handleChange("name", target.value)}
                label="Category Name"
                placeholder="e.g., Prints, Keychains, Pins"
                type="text"
            />

            <div className="flex justify-end mt-6">
                <button disabled={loading} onClick={() => handleSubmit(category)} type="button" className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] font-semibold hover:cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Category" : "Add Category"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm