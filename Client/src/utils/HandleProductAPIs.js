import { apiUrl } from "./constant.jsx";

export const fetchFavProducts = async (setFavProduct) => {
  try {
    const response = await fetch(`${apiUrl}/addToFav/get-favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (result?.data) {
      setFavProduct(result.data); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const checkFav = async (productId, setIsFavorited) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToFav/check-favorite?productId=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    // console.log(result);

    if (result?.data) {
      setIsFavorited(result.data.isFavorited); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const AddFavProducts = async (id) => {
  // console.log("Adding favorite products id: ", id);

  try {
    const response = await fetch(`${apiUrl}/addToFav/add-to-favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
      credentials: "include",
    });
    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const RemoveFavProducts = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/addToFav/remove-favorites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
      credentials: "include",
    });
    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
