import moment from "moment";

export const addThousandSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    return Number(num).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20
    });
};

export const prepareSaleLineChartData = (data = []) => {
    const groupedByDate = data.reduce((acc, sale) => {
        const dateKey = sale.date;

        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey,
                totalAmount: 0,
                items: [],
            };
        }

        acc[dateKey].totalAmount += Number(sale.totalNet);
        acc[dateKey].items.push(sale);
        return acc;
    }, {});

    let chartData = Object.values(groupedByDate);

    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    chartData = chartData.map((dataPoint) => ({
        ...dataPoint,
        month: moment(dataPoint.date).format("Do MMM"),
    }));

    return chartData;
}