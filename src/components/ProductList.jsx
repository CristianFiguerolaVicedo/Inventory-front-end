import { Download, LoaderCircle } from "lucide-react";
import { useState } from "react";
import ProductInfoCard from "./ProductInfoCard";

const ProductList = ({products, onDelete, onDownload}) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);

        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#e5e1df] rounded-xl shadow-sm border border-gray-200 shadow-xl p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg text-[#717866] font-semibold">Products</h5>
                <div className="flex items-center justify-end gap-2">
                    <button
                        disabled={loading}
                        onClick={handleDownload}
                        className="flex items-center gap-1 bg-[#949488]/60 rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2"
                    >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Downloading...
                        </>
                    ) : (
                        <>
                            <Download size={15} className="text-base" />
                            Download
                        </>
                    )}      
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {products?.map((product) => (
                    <ProductInfoCard 
                        key={product.id}
                        name={product.name}
                        packaging={product.packaging}
                        production_price={product.production_price}
                        pvp={product.pvp}
                        stock={product.stock}
                        status={product.status}
                        notes={product.notes}
                        onDelete={() => onDelete(product.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductList;