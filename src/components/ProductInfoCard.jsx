import { Check, Clock, Trash2, X } from "lucide-react";

const ProductInfoCard = ({name, packaging, production_price, pvp, stock, status, notes, hideDeleteBtn, onDelete}) => {
    const statusStyles = {
        IN_STOCK: 'bg-green-50 text-green-800',
        SOLD_OUT: 'bg-red-50 text-red-800',
        COMING_SOON: 'bg-orange-50 text-orange-800',
    };

    const getStatusStyles = () => statusStyles[status] || '';

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 hover:cursor-pointer">
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">
                        {name}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mt-1">
                        {packaging}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {stock}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mt-1">
                        {production_price}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {pvp}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mt-1">
                        {notes}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button onClick={onDelete} className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Trash2 size={18}/>
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getStatusStyles}`}>
                        <h6 className="text-xs font-medium">
                            {status === 'IN_STOCK' ? <Check /> : status === 'SOLD_OUT' ? <X /> : status === 'COMING_SOON' ? <Clock /> : ""}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfoCard;