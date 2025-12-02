import { useEffect, useState } from "react";
import FormInput from "./FormInput";

const AddProductForm = ({onAddProduct, categories}) => {
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

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const statusOptions = [
        { value: "IN_STOCK", label: "In Stock" },
        { value: "SOLD_OUT", label: "Sold Out" },
        { value: "COMING_SOON", label: "Coming Soon" }
    ]

    const handleChange = (key, value) => {
        setProduct({...product, [key]: value});
    }

    const handleAddProduct = async () => {
        setLoading(true);

        try{
            await onAddProduct(product);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !product.categoryId) {
            setProduct((prev) => ({...prev, categoryId: categories[0].id}));
        }
    }, [categories, product.categoryId]);

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
                options={statusOptions}
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
                            Adding...
                        </>
                    ) : (
                        <>
                            Add Product
                        </>
                    )}
                </button>
            </div>
        </div>
    )

}

export default AddProductForm;