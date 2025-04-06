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


export const registerUser = async (userInputData,setUser) => {
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
            setUser(result.data); // ✅ Update state inside component
            localStorage.setItem("userId", result.data._id);
        }
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

export const loginUser = async (loginData, setUser,setIsLoginOpen) => {
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
            setIsLoginOpen(false); // ✅ Reload page to reflect changes
            localStorage.removeItem("userId")
            localStorage.setItem("userId", result.data._id);
            localStorage.setItem("username", result.data.fullName);
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
};
.32
export const logoutUser = async (setResponse) => {
    try {
        const response = await fetch(`${apiUrl}/users/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (result?.statusCode === 200) {
            console.log("User logged out successfully")
            setResponse(result); // ✅ Update state inside component
            localStorage.removeItem("username");
            localStorage.removeItem("userId", result.data._id);
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

export const refreshTokens = async (setUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        });

        const result = await response.json();
        if (result?.data) {
            setUser(result.data); // ✅ Update state inside component
        }
        else{
            localStorage.removeItem("username");
        }
    } catch (error) {
        console.error("Error refreshing tokens:", error);
    }
};
