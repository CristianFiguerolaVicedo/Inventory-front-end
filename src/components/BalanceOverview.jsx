import { ArrowDown, ArrowUp, Coins, Plus, ShoppingCart, TrendingDown, TrendingUp } from "lucide-react";

const BalanceOverview = ({incomes, expenses, sales, onAddIncome, onAddExpense}) => {
    const safeIncomes = Array.isArray(incomes) ? incomes : [];
    const safeExpenses = Array.isArray(expenses) ? expenses : [];
    const safeSales = Array.isArray(sales) ? sales : [];

    const totalNonSaleIncomes = safeIncomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const totalExpenses = safeExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const totalSalesNet = safeSales.reduce((sum, s) => sum + Number(s.totalNet || 0), 0);

    const monthlyBalance = totalNonSaleIncomes + totalSalesNet - totalExpenses;

    return(
        <div className="bg-white p-5 shadow-sm rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-semibold text-[#505746]">
                    Balance
                </h5>
                <div className="flex gap-3">
                    <button onClick={onAddIncome} className="flex items-center gap-1 bg-[#949488] rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2">
                        <Plus size={18}/> Add Income
                    </button>
                    <button onClick={onAddExpense} className="flex items-center gap-1 bg-[#949488] rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2">
                        <Plus size={18}/> Add Expense
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4">
                
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-4">
                <div className="bg-[#e5e1df] p-4 rounded-xl shadow-inner flex items-center justify-start gap-3">
                    <TrendingDown size={20} className="text-red-600"/> Expenses
                </div>
                <p className="text-2xl mt-2 text-red-500 font-bold">
                    {totalExpenses.toFixed(2)}€
                </p>
                <div className="bg-[#e5e1df] p-4 rounded-xl shadow-inner flex items-center justify-start gap-3">
                    <TrendingUp size={20} className="text-green-600"/> Incomes
                </div>
                <p className="text-2xl mt-2 text-green-600 font-bold">
                    {totalNonSaleIncomes.toFixed(2)}€
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4">
                <div className="bg-[#e5e1df] p-4 rounded-xl shadow-inner flex items-center justify-start gap-3">
                    <ShoppingCart size={20} className="text-blue-600"/> Sales
                </div>
                <p className="text-2xl mt-2 text-blue-600 font-bold">
                    {totalSalesNet.toFixed(2)}€
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4">
                <div className="bg-[#e5e1df] p-4 rounded-xl shadow-inner flex items-center justify-start gap-3">
                    <Coins size={20}/> Balance
                </div>
                <p className="text-2xl mt-2 font-bold">
                    {monthlyBalance.toFixed(2)}€
                </p>
            </div>
        </div>
    )
}

export default BalanceOverview;