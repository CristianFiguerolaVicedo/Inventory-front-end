import { Plus } from "lucide-react";

const ProductOverview = ({onAddProduct}) => {
    return(
        <div className="p-4 bg-[#e5e1df] rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-2xl font-semibold text-[#505746]">
                        Products
                    </h5>
                    <p className="text-xs text-[#e5e1df] mt-0 5">
                        Keep track of your products, stock, prices and more.
                    </p>
                </div>
                <button onClick={onAddProduct} className="flex items-center gap-1 bg-[#949488] rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2">
                    <Plus size={15} className="text-lg"/> Add Product
                </button>
            </div>
        </div>
    )
}

export default ProductOverview;