import { useState } from "react";
import  FormInput  from "./FormInput";

const AddExpenseForm = ({onAdd}) => {
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = () => {
        onAdd({ date, amount, name });
    };

    return(
        <div>
            <div className="mb-3">
                <FormInput 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Name"
                    type="text"
                />
            </div>

            <div className="mb-3">
                <FormInput 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    label="Date"
                    type="date"
                />
            </div>

            <div className="mb-3">
                <FormInput 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    label="Amount"
                    type="number"
                />
            </div>
            <button onClick={handleSubmit} className="w-full bg-[#949488] text-white py-2 rounded-lg mt-4 hover:cursor-pointer hover:bg-[#717866]">
                Add Expense
            </button>
        </div>
    )
}

export default AddExpenseForm;