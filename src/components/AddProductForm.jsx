import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { LoaderCircle } from "lucide-react";

const AddProductForm = ({onAddProduct, isEditing, initialProductData, categories}) => {
    const [product, setProduct] = useState({
        name: "",
        stock: 0,
        packaging: 0,
        production_price: 0,
        pvp: 0,
        status: "",
        notes: "",
        categoryId: ""
    });

    const [loading, setLoading] = useState(false);

    const getStatusOptions = () => {
        if (product.stock > 0) {
            return [
                {value: "", label: "Choose an option"},
                {value: "IN_STOCK", label: "In Stock"}
            ];
        } else if (product.stock <= 0 || !product.stock) {
            return [
                {value: "", label: "Choose an option"},
                {value: "SOLD_OUT", label: "Sold Out"},
                {value: "COMING_SOON", label: "Coming Soon"}
            ];
        }

        return[];
    }

    useEffect(() => {
        if (isEditing && initialProductData) {
            setProduct({
                id: initialProductData.id,
                name: initialProductData.name,
                stock: initialProductData.stock,
                packaging: initialProductData.packaging,
                production_price: initialProductData.productionPrice,
                pvp: initialProductData.pvp,
                status: initialProductData.status,
                notes: initialProductData.notes,
                categoryId: initialProductData.categoryId
            });
        } else {
            setProduct({
                name: "",
                stock: 0,
                packaging: 0,
                production_price: 0,
                pvp: 0,
                status: "",
                notes: "",
                categoryId: ""
            })
        }
    }, [isEditing, initialProductData])

    const categoryOptions = [
        { value: "", label: "Choose a category" },
        ...categories.map(category => ({
            value: category.id,
            label: category.name
        }))
    ];


    useEffect(() => {
        if (!categories.length) return;

        setProduct(prev => {
            if (isEditing && prev.categoryId) {
                return prev;
            }

            return {
                ...prev,
                categoryId: categories[0].id
            };
        });
    }, [categories, isEditing]);

    const handleChange = (key, value) => {
        setProduct({...product, [key]: value});
    }

    const handleAddProduct = async () => {
        if (!product.categoryId) return;

        setLoading(true);

        try{
            await onAddProduct(product);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isEditing && categories.length > 0 && !product.categoryId) {
            setProduct(prev => ({
                ...prev,
                categoryId: ""
            }));
        }
    }, [categories, isEditing]);


    useEffect(() => {
        const validStatuses = getStatusOptions().map(opt => opt.value);
        if (!validStatuses) {
            setProduct(prev => ({...prev, status: validStatuses[0] || ""}));
        }
    }, [product.stock]);

    return (
        <div>
            <FormInput 
                value={product.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Product Name"
                placeholder="e.g., Print, Keychain, Standee"
                type="text"
            />

            <FormInput 
                value={product.stock}
                onChange={({target}) => handleChange('stock', target.value)}
                label="Stock"
                placeholder="e.g., 10, 2, 50"
                type="number"
            />

            <FormInput 
                value={product.packaging}
                onChange={({target}) => handleChange('packaging', target.value)}
                label="Packaging"
                placeholder="e.g., 10, 2, 50"
                type="number"
            />

            <FormInput 
                value={product.production_price}
                onChange={({target}) => handleChange('production_price', target.value)}
                label="Production Price"
                placeholder="e.g., 10, 2, 50"
                type="number"
            />

            <FormInput 
                value={product.pvp}
                onChange={({target}) => handleChange('pvp', target.value)}
                label="P.V.P"
                placeholder="e.g., 10, 2, 50"
                type="number"
            />

            <FormInput 
                value={product.status}
                onChange={({target}) => handleChange('status', target.value)}
                label="Status"
                isSelect={true}
                options={getStatusOptions()}
            />

            <FormInput 
                value={product.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                label="Category"
                isSelect={true}
                options={categoryOptions}
            />

            <div className="flex justify-end mt-6">
                <button disabled={loading} onClick={handleAddProduct} type="button" className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] font-semibold hover:cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Product" : "Add Product"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )

}

export default AddProductForm;