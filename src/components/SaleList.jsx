import { Check, Cross, Download, LoaderCircle, Trash, X } from "lucide-react";

const SaleList = ({ sales, onDelete }) => {

    console.log("Loaded sales", sales);

    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-[#717866]">Sales</h5>
            </div>
            {sales.length > 0 ? (
                <table className="w-full border-collapse bg-white rounded-lg shadow table-fixed">
                    <thead className="text-sm bg-[#505746] text-[#e5e1df]">
                        <tr>
                            <th className="p-2 text-left w-1/12">Date</th>
                            <th className="p-2 text-left w-1/12">Products</th>
                            <th className="p-2 text-left w-1/12">Packaging</th>
                            <th className="p-2 text-left w-1/12">Production Fees</th>
                            <th className="p-2 text-left w-1/12">Sending Fees</th>
                            <th className="p-2 text-left w-1/12">Contract</th>
                            <th className="p-2 text-left w-1/12">Sent</th>
                            <th className="p-2 text-left w-1/12">I.V.A</th>
                            <th className="p-2 text-left w-1/12">Taxes</th>
                            <th className="p-2 text-left w-1/12">Total Net</th>
                            <th className="p-2 text-left w-1/12">Total Sale</th>
                            <th className="p-2 text-left w-1/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {sales.map((sale) => (
                            <tr key={sale.id} className="border-t border-[#505746] bg-[#e5e1df] text-[#717688]">
                                <td className="p-2">{sale.date}</td>
                                <td className="p-2">
                                    {sale.details.map((detail, index) => (
                                        <div key={index}>
                                            {detail.productName} (x{detail.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td className="p-2">{sale.packaging}</td>
                                <td className="p-2">{sale.productionFees}</td>
                                <td className="p-2">{sale.sendingFees}</td>
                                <td className="p-2">{sale.contract ? (
                                    <span className="flex items-center gap-1">
                                        <Check className="text-[#717688]"/>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <X className="text-[#717688]"/>
                                    </span>
                                )}</td>
                                <td className="p-2">{sale.sent ? (
                                    <span className="flex items-center gap-1">
                                        <Check className="text-[#717688]"/>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <X className="text-[#717688]"/>
                                    </span>
                                )}</td>
                                <td className="p-2">{sale.iva ? (
                                    <span className="flex items-center gap-1">
                                        <Check className="text-[#717688]"/>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <X className="text-[#717688]"/>
                                    </span>
                                )}</td>
                                <td className="p-2">{sale.taxes}</td>
                                <td className="p-2">{sale.totalNet}</td>
                                <td className="p-2">{sale.totalSale}</td>
                                <td className="p-2">
                                    <button onClick={() => onDelete(sale.id)} className="text-[#717688] hover:text-red-400 opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Trash size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm text-[#b7b2ac] mt-2">
                    No sales yet. Add some!
                </p>
            )}
        </div>
    )
}

export default SaleList;