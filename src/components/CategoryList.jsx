import { ChartColumnStacked, Pencil, TrashIcon } from "lucide-react";

const CategoryList = ({categories, onEditCategory, onDeleteCategory}) => {
    return(
        <div className="bg-[#e5e1df] rounded-xl shadow-sm border border-gray-200 shadow-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#717866]">
                    Categories
                </h4>
            </div>

            {categories.length === 0 ? (
                <p className="text-[#b7b2ac]">
                    No categories added yet. Add some to get started.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div key={category.id} className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-[#b7b2ac]/50 hover:cursor-pointer">
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="h-5 w-5"/>
                                    </span>
                                ) : (
                                    <ChartColumnStacked className="text-[#949488]" size={24}/>
                                )}
                            </div>

                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#717866] font-medium">
                                        {category.name}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button onClick={() => onEditCategory(category)} className="text-[#949488] hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Pencil size={18}/>
                                    </button>
                                    <button onClick={() => onDeleteCategory(category.id)} className="text-[#949488] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <TrashIcon size={18}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryList;