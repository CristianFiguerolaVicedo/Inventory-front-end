import { useEffect, useState } from "react";
import { prepareSaleLineChartData } from "../util/util";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart";

const SaleOverview = ({sales, onAddSale}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareSaleLineChartData(sales);
        setChartData(result);
    }, [sales]);

    return(
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold text-[#717866]">
                        Sales
                    </h5>
                    <p className="text-xs text-[#b7b2ac] mt-0 5">
                        Track your sales and analise your earnings.
                    </p>
                </div>
                <button onClick={onAddSale} className="flex items-center gap-1 bg-[#949488] rounded-md text-white hover:cursor-pointer hover:bg-[#717866] p-2">
                    <Plus size={15} className="text-lg"/> Add Sale
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData}/>
            </div>
        </div>
    )
}

export default SaleOverview;