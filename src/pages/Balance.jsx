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
                    incomes={incomes}
                    expenses={expenses}
                    sales={sales}
                    onAddIncome={() => setOpenAddIncomeModal(true)}
                    onAddExpense={() => setOpenAddExpenseModal(true)}
                />

                <IncomesList 
                    incomes={incomes}
                    onDelete={(id) => setOpenDeleteAlert({show: true, type: "income", id})}
                />

                <ExpenseList 
                    expenses={expenses}
                    onDelete={(id) => setOpenDeleteAlert({show: true, type: "income", id})}
                />

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