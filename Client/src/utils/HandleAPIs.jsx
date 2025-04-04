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


export const registerUser = async (userInputData, setResponse) => {
    try {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInputData),
        });

        const result = await response.json();
        if (result?.data) {
            setResponse(result); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

export const loginUser = async (loginData, setUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include', // ✅ Ensures cookies are sent
        });

        const result = await response.json();
        if (result?.data) {
            setUser(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export const logoutUser = async (setResponse) => {
    try {
        const response = await fetch(`${apiUrl}/users/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        const result = await response.json();
        if (result?.status === 200) {
            setResponse(result); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const getUserProfile = async (setUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        if (result?.data) {
            setUser(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

export const updateUserProfile = async (updatedData, setUpdatedUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
            credentials: 'include',
        });

        const result = await response.json();
        if (result?.data) {
            setUpdatedUser(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
    }
};

export const refreshTokens = async (setTokens) => {
    try {
        const response = await fetch(`${apiUrl}/users/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        });

        const result = await response.json();
        if (result?.data) {
            setTokens(result.data); // ✅ Update state inside component
        }
    } catch (error) {
        console.error("Error refreshing tokens:", error);
    }
};
