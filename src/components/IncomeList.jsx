import { Trash } from "lucide-react";

const IncomesList = ({incomes, onDelete}) => {
    return(
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h5 className="text-lg font-semibold text-[#717866] mb-3">
                Incomes
            </h5>

            {incomes.length > 0 ? (
                <table className="ww-full table-fixed">
                    <thead className="text-sm text-[#e5e1df] bg-[#505746]">
                        <tr>
                            <th className="p-2 text-left ww-1/4">Name</th>
                            <th className="p-2 text-left ww-1/4">Date</th>
                            <th className="p-2 text-left ww-1/4">Amount</th>
                            <th className="p-2 text-left ww-1/4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {incomes.map((income) => (
                            <tr key={income.id} className="border-t bg-[#e5e1df] text-[#717688]">
                                <td className="p-2">{income.name}</td>
                                <td className="p-2">{income.date}</td>
                                <td className="p-2">{income.amount}</td>
                                <td className="p-2">
                                    <button onClick={() => onDelete(income.id)} className="text-[#717688] hover:text-red-400 opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Trash size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm text-gray-500">
                    No incomes added yet. Try to add some.
                </p>
            )}
        </div>
    )
}

export default IncomesList;