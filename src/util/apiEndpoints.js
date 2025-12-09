//export const BASE_URL = "https://inventory-back-end-3u2z.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_NAME = "di1bsahds";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    DELETE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    DOWNLOAD_PRODUCT_DETAILS: "/excel/download/product",
    ADD_PRODUCT: "/products",
    GET_ALL_PRODUCTS: "/products",
    DELETE_PRODUCT: (productId) => `/products/${productId}`,
    APPLY_FILTER: "/filter",
    GET_SALES: "/sales",
    ADD_SALE: "/sales",
    DELETE_SALE: (saleId) => `/sales/${saleId}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
}