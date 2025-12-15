import { useState } from "react";
import FormInput from "./FormInput";
import { LoaderCircle, Plus, Trash } from "lucide-react";

const AddSaleForm = ({onAddSale, products}) => {
    const [sale, setSale] = useState({
        date: "",
        contract: false,
        iva: false,
        packaging: 0,
        productionFees: 0,
        sendingFees: 0,
        sent: false,
        taxes: 0,
        details: [
            {
                productId: products[0]?.id,
                quantity: 0,
                unitPrice: 0
            }
        ]
    });

    const [loading, setLoading] = useState(false);

    const prodOptions = products.map(product => ({
        value: product.id,
        label: product.name
    }));

    const handleChange = (key, value) => {
        setSale({...sale, [key]: value});
    }

    const handleDetailChange = (index, key, value) => {
        const updated = [...sale.details];
        updated[index][key] = value;
        setSale({...sale, details: updated});
    };

    const addProductRow = () => {
        setSale({...sale, details: [
            ...sale.details,
            {productId: products[0]?.id, quantity: 1, unitPrice: 0}
        ]});
    }

    const removeProductRow = (index) => {
        if (sale.details.length === 1) return;
        setSale({
            ...sale,
            details: sale.details.filter((_, i) => i !== index)
        });
    }

    const handleAddSale = async () => {
        setLoading(true);

        try {
            await onAddSale(sale);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="max-h-[70vh] overflow-y-auto px-1">
            <FormInput 
                value={sale.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                type="date"
            />

            <FormInput 
                value={sale.contract}
                onChange={({target}) => handleChange('contract', target.value)}
                label="Contract"
                type="checkbox"
            />

            <FormInput 
                value={sale.iva}
                onChange={({target}) => handleChange('iva', target.value)}
                label="I.V.A"
                type="checkbox"
            />

            <FormInput 
                value={sale.packaging}
                onChange={({target}) => handleChange('packaging', target.value)}
                label="Packaging"
                placeholder="e.g., 100"
                type="number"
            />

            <FormInput 
                value={sale.productionFees}
                onChange={({target}) => handleChange('productionFees', target.value)}
                label="Production Fees"
                placeholder="e.g., 10"
                type="number"
            />

            <FormInput 
                value={sale.sendingFees}
                onChange={({target}) => handleChange('sendingFees', target.value)}
                label="Sending Fees"
                placeholder="e.g., 100"
                type="number"
            />

            <FormInput 
                value={sale.sent}
                onChange={({target}) => handleChange('sent', target.value)}
                label="Sent"
                type="checkbox"
            />

            <FormInput 
                value={sale.taxes}
                onChange={({target}) => handleChange('taxes', target.value)}
                label="Taxes"
                placeholder="e.g., 10"
                type="number"
            />

            <h3 className="text-lg font-semibold mt-4 mb-2">Products</h3>

            {sale.details.map((item, index) => (
                <div key={index} className="border border-[#717866] rounded-lg p-3 mb-4 bg-[#d9d9d2]">
                    <FormInput 
                        label="Product"
                        value={item.productId}
                        isSelect={true}
                        options={prodOptions}
                        onChange={(e) => {
                            const value = e.target.value;
                            handleDetailChange(index, "productId", value);
                            const product = products.find(p => p.id === value);
                            handleDetailChange(index, "unitPrice", product ? product.unitPrice : 0);
                        }}
                    />

                    <FormInput 
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={({target}) => {
                            const value = Number(target.value);
                            handleDetailChange(index, "quantity", value);
                        }}
                    />

                    {sale.details.length > 1 && (
                        <button type="button" onClick={() => removeProductRow(index)} className="mt-2 flex items-center gap-1 text-red-700 hover:text-red-900">
                            <Trash size={18}/>
                            Remove Product
                        </button>
                    )}
                </div>
            ))}

            <button type="button" onClick={addProductRow} className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] mb-4">
                <Plus size={18}/>
                Add another product
            </button>

            <div className="flex justify-end mt-6">
                <button disabled={loading} onClick={handleAddSale} type="button" className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] font-semibold hover:cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Adding...
                        </>
                    ) : (
                        <>
                            Add Sale
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddSaleForm;