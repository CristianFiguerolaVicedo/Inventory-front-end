import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import FormInput from "./FormInput";

const AddEventForm = ({onAddEvent, }) => {
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({
        name: "",
        date: "",
        description: ""
    })

    const handleChange = (key, value) => {
        setEvent({...event, [key]: value});
    }

    const handleAddEvent = async () => {
        setLoading(true);

        try {
            await onAddEvent(event);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <FormInput 
                value={event.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Event Name"
                placeholder="e.g., Expo, Market"
                type="text"
            />

            <FormInput 
                value={event.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                type="date"
            />

            <FormInput 
                value={event.description}
                onChange={({target}) => handleChange('description', target.value)}
                label="Description"
                placeholder="e.g., Paris expo, Germany market"
                type="text"
            />

            <div className="flex justify-end mt-6">
                <button disabled={loading} onClick={handleAddEvent} className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] font-semibold hover:cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Adding...
                        </>
                    ) : (
                        <>
                            Add Event
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddEventForm;