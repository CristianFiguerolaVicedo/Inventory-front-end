import { LoaderIcon } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({content, onDelete}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <p className="text-xl text-[#949488]">
                {content}
            </p>
            <div className="flex justify-end mt-6">
                <button disabled={loading} type="button" onClick={handleDelete} className="flex items-center gap-1 bg-[#717866] text-[#e5e1df] px-3 py-2 rounded-lg hover:bg-[#505746] font-semibold hover:cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderIcon className="h-4 w-4 animate-spin"/>
                            Deleting...
                        </>
                    ) : (
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;