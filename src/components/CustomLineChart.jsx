import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { addThousandSeparator } from "../util/util";

const CustomLineChart = ({data}) => {
    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;

            const groupedProducts = dataPoint.items.reduce((acc, sale) => {
                sale.details.forEach(detail => {
                    if (!acc[detail.productName]) {
                        acc[detail.productName] = {
                            productName: detail.productName,
                            totalAmount: 0,
                        };
                    }

                    acc[detail.productName].totalAmount += detail.unitPrice * detail.quantity;
                });

                return acc;
            }, {});

            const productsInTooltip = Object.values(groupedProducts);

            return(
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                        {label}
                    </p>
                    <hr className="my-1 border-gray-200" />
                    <p className="text-sm text-gray-700 font-bold mb-2">
                        Total: <span className="text-[#505746]">&#36;{addThousandSeparator(dataPoint.totalAmount)}</span>
                    </p>

                    {productsInTooltip && productsInTooltip > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-600 mb-1">
                                Details:
                            </p>
                            {productsInTooltip.map((groupedItem, index) => (
                                <div key={index} className="flex justify-between text-xs text-gray-700">
                                    <span>{groupedItem.productName}</span>
                                    <span>&#36;{addThousandSeparator(groupedItem.totalAmount)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return(
        <div className="bg-white">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="saleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#505746" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#505746" stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none"/>
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none"/>
                    <Tooltip content={<CustomTooltip />} />

                    <Area 
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#505746"
                        fill="url(#saleGradient)"
                        strokeWidth={3}
                        dot={{ r:3, fill: "#ab8df8" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomLineChart;