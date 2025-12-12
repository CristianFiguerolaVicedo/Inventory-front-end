import { useEffect, useState } from "react";
import useUser from "../hooks/useUserHook";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Dashboard from "../components/Dashboard";
import BalanceOverview from "../components/BalanceOverview";
import IncomesList from "../components/IncomeList";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";

const Balance = () => {
    useUser();

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);

    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        type: null,
        id: null
    });

    const fetchData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const [incomeRes, expenseRes, salesRes] = await Promise.all([
                axiosConfig.get(API_ENDPOINTS.GET_INCOMES),
                axiosConfig.get(API_ENDPOINTS.GET_EXPENSES),
                axiosConfig.get(API_ENDPOINTS.GET_SALES)
            ]);

            setIncomes(incomeRes.data);
            setExpenses(expenseRes.data);
            setSales(salesRes.data);
        } catch (error) {
            toast.error("Error loading balance data");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const allYears = [
            ...incomes.map(i => new Date(i.date).getFullYear()),
            ...expenses.map(e => new Date(e.date).getFullYear()),
            ...sales.map(s => new Date(s.date).getFullYear()),
        ];

        const years = [...new Set(allYears)].sort();

        if (years.length > 0) {
            setAvailableYears(years);

            if (!years.includes(selectedYear)) {
                setSelectedYear(years[years.length - 1]);
            }
        }
    }, [incomes, expenses, sales]);

    const filterByMonth = (items) => {
        return items.filter((item) => {
            const itemDate = new Date(item.date);
            const month = itemDate.getMonth() + 1;
            const year = itemDate.getFullYear();

            return month === selectedMonth && year === selectedYear;
        })
    }

    const filteredIncomes = filterByMonth(incomes);
    const filteredExpenses = filterByMonth(expenses);
    const filteredSales = filterByMonth(sales);

    const handleAddIncome = async (income) => {
        const {name, date, amount} = income;

        if (!date) {
            toast.error("Please select a valid date");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                date,
                amount: Number(amount)
            });

            if (response.status === 201) {
                toast.success("Income added successfully!");
                setOpenAddIncomeModal(false);
                fetchData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add income");
        }
    };

    const handleAddExpense = async (expense) => {
        const {name, date, amount} = expense;

        if (!date) {
            toast.error("Please select a valid date");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                date,
                amount: Number(amount)
            });

            if (response.status === 201) {
                toast.success("Expense added successfully!");
                setOpenAddExpenseModal(false);
                fetchData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    }

    const deleteRecord = async () => {
        const {type, id} = openDeleteAlert;

        try {
            if (type === "income") {
                await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
                toast.success("Income deleted successfully!");
            } else if (type === "expense") {
                await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
                toast.success("Expense deleted successfully!");
            }

            setOpenDeleteAlert({show: false, type: null, id: null});
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete");
        }
    }

    return(
        <Dashboard activeMenu="Balance">
            <div className="my-5 mx-auto grid grid-cols-1 gap-6">
                <BalanceOverview 
                    incomes={filteredIncomes}
                    expenses={filteredExpenses}
                    sales={filteredSales}
                    onAddIncome={() => setOpenAddIncomeModal(true)}
                    onAddExpense={() => setOpenAddExpenseModal(true)}
                />

                <div className="flex gap-4 items-center mb-4">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="bg-[#717866] text-[#e5e1df] p-2 rounded"
                    >
                        {Array.from({length: 12}, (_, i) => (
                            <option value={i + 1} key={i + 1}>
                                {new Date(0, i).toLocaleString("en", {month: "long"})}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="bg-[#717866] text-[#e5e1df] p-2 rounded"
                    >
                        {availableYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2">
                    <IncomesList 
                        incomes={filteredIncomes}
                        onDelete={(id) => setOpenDeleteAlert({show: true, type: "income", id})}
                    />

                    <ExpenseList 
                        expenses={filteredExpenses}
                        onDelete={(id) => setOpenDeleteAlert({show: true, type: "expense", id})}
                    />
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    title="Add Income"
                    onClose={() => setOpenAddIncomeModal(false)}
                >
                    <AddIncomeForm onAdd={handleAddIncome}/>
                </Modal>

                <Modal
                    isOpen={openAddExpenseModal}
                    title="Add Expense"
                    onClose={() => setOpenAddExpenseModal(false)}
                >
                    <AddExpenseForm onAdd={handleAddExpense}/>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    title="Delete Record"
                    onClose={() => setOpenDeleteAlert({show: false, type: null, id: null})}
                >
                    <DeleteAlert content="Are you sure you want to delete this record?" onDelete={deleteRecord}/>
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Balance;