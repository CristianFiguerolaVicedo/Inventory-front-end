import { useEffect, useState } from "react";
import useUser from "../hooks/useUserHook";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Dashboard from "../components/Dashboard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Plus, Trash } from "lucide-react";
import Modal from "../components/Modal";
import AddEventForm from "../components/AddEventForm";
import DeleteAlert from "../components/DeleteAlert";

const Calendar = () => {
    useUser();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openAddEventModal, setOpenAddEventModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const fetchEvents = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_EVENTS);

            if (response.status === 200) {
                const mappedEvents = response.data.map(event => ({
                    id: event.id,
                    title: event.name,
                    start: event.date,
                    extendedProps: {
                        description: event.description,
                    }
                }));

                setEvents(mappedEvents);
            }
        } catch (error) {
            console.error("Failed to fetch event details", error);
            toast.error(error.response?.data?.message || "Failed to fetch event details");
        } finally {
            setLoading(false);
        }
    }

    const handleAddEvent = async (event) => {
        const {name, date, description} = event;

        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!date) {
            toast.error("You have to enter a date");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EVENT, {
                name,
                date,
                description
            });

            if (response.status === 201) {
                setOpenAddEventModal(false);
                toast.success("Event added successfully!");
                fetchEvents();
            }
        } catch (error) {
            console.error("Failed to add the event", error);
            toast.error(error.response?.data?.message || "Failed to add the event");
        }
    }

    const deleteEvent = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EVENT(id));
            setOpenDeleteAlert({show: false, data: null});
            setSelectedEvent(null);
            toast.success("Event deleted successfully!");
            fetchEvents();
        } catch (error) {
            console.error("Failed to delete the event", error);
            toast.error(error.response?.data?.message || "Failed to delete the event");
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return(
        <Dashboard activeMenu="Calendar">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-2xl font-semibold text-[#505746]">
                        Calendar
                    </h5>
                    <p className="text-xs text-[#e5e1df] mt-0 5">
                        Keep an eye on your events.
                    </p>
                </div>
                <button onClick={() => setOpenAddEventModal(true)} className="flex items-center gap-1 bg-[#949488] rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2">
                    <Plus size={15} className="text-lg"/> Add Event
                </button>
            </div>
            <div className="my-5 mx-auto max-w-5xl bg-[#717866] p-4 rounded shadow">
                <Modal
                    title="Add Event"
                    isOpen={openAddEventModal}
                    onClose={() => setOpenAddEventModal(false)}
                >
                    <AddEventForm 
                        onAddEvent={(event) => handleAddEvent(event)}
                    />
                </Modal>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="80vh"
                    selectable={true}
                    eventClick={(info) => {
                        setSelectedEvent({
                            id: info.event.id,
                            title: info.event.title,
                            description: info.event.extendedProps.description,
                            date: info.event.startSrt
                        });
                    }}

                />

                {selectedEvent && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-[#717866] text-[#e5e1df] p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>

                            <p className="text-[#e5e1df]">
                                <span className="font-semibold">Date: </span>{selectedEvent.date}
                            </p>

                            <p className="text-[#e5e1df] mb-4 whitespace-pre-line">
                                <span className="font-semibold">Description: </span>{selectedEvent.description}
                            </p>

                            <div className="flex items-center justify-end gap-2">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setOpenDeleteAlert({show: true, data: selectedEvent.id})} className="px-4 py-2.5 bg-[#505746] text-white rounded hover:bg-[#24271f] hover:cursor-pointer">
                                        <Trash size={18}/>
                                    </button>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setSelectedEvent(null)} className="px-4 py-2 bg-[#505746] text-white rounded hover:bg-[#24271f] hover:cursor-pointer">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show: false, data: null})}
                    title="Delete Event"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this event?"
                        onDelete={() => deleteEvent(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Calendar;