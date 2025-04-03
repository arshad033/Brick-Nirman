import { apiUrl } from "./constant.jsx";

// ✅ Fetch function accepts setProduct from context
export const fetchProducts = async (setProduct) => {
    try {
        const response = await fetch(`${apiUrl}/products/get-all-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        
        if (result?.data) {
            setProduct(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
