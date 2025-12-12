import { Trash } from "lucide-react";

const ExpenseList = ({expenses, onDelete}) => {
    return(
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h5 className="text-lg font-semibold text-[#717866] mb-3">
                Expenses
            </h5>

            {expenses.length > 0 ? (
                <table className="w-full table-fixed">
                    <thead className="text-sm text-[#e5e1df] bg-[#505746]">
                        <tr>
                            <th className="p-2 text-left w-1/4">Name</th>
                            <th className="p-2 text-left w-1/4">Date</th>
                            <th className="p-2 text-left w-1/4">Amount</th>
                            <th className="p-2 text-left w-1/4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="border-t bg-[#e5e1df] text-[#717688]">
                                <td className="p-2">{expense.name}</td>
                                <td className="p-2">{expense.date}</td>
                                <td className="p-2">{expense.amount}</td>
                                <td className="p-2">
                                    <button onClick={() => onDelete(expense.id)} className="text-[#717688] hover:text-red-400 opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Trash size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm text-gray-500">
                    No expeses added yet. Try to add some.
                </p>
            )}
        </div>
    )
}

export default ExpenseList;