import { apiUrl } from "./constant.jsx";

// add to favorites
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
export const fetchProductDetails = async (id, setProduct) => {
  try {
    const response = await fetch(`${apiUrl}/products/get-product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();

    if (result?.data) {
      setProduct(result.data); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching data:", error);
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

// add to cart
export const AddCartProduct = async (id, price) => {
  // console.log("Adding favorite products id: ", id);

  try {
    const response = await fetch(`${apiUrl}/addToCart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id, price }),
      credentials: "include",
    });
    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const checkCart = async (productId, setIsCarted) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToCart/check-cart/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    // console.log("is carted value: ", result);

    if (result?.data) {
      setIsCarted(result.data.isInCart); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const RemoveCartProduct = async (productId) => {
  // console.log("Adding favorite products id: ", id);

  try {
    const response = await fetch(
      `${apiUrl}/addToCart/remove-from-cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
