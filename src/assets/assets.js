import { FunnelPlus, List, PackageSearch } from "lucide-react";
import logo from "./inventario (2).png";
import loginBg from "./warehouse-storage-shelves-with-cardboard-boxes.jpg";

export const assets = {
    logo,
    loginBg
}

export const SIDE_BAR_DATA = [
    {
        id: "1",
        label: "Products",
        icon: PackageSearch,
        path: "/product"
    },
    {
        id: "2",
        label: "Categories",
        icon: List,
        path: "/category"
    },
    {
        id: "3",
        label: "Filter",
        icon: FunnelPlus,
        path: "/filter"
    },
];