/* eslint-disable no-unused-vars */
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
//get Supplier Producyts by SupplierId
export const fetchProductsBySupplierId = async (
  supplierId,
  setSupplierProducts
) => {
  console.log("Fetching products for Supplier ID: ", supplierId);
  try {
    const response = await fetch(
      `${apiUrl}/products/get-supplier-products/${supplierId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const result = await response.json();
    if (result?.data) {
      setSupplierProducts(result.data); // ✅ Update products state
    }
  } catch (error) {
    console.error("Error fetching supplier products:", error);
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

export const AddCartProduct = async (productId, price, setCartProducts) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, price }),
    });
    const result = await response.json();
    if (result.success) {
      await getCartItems(setCartProducts); // update cart
    }
  } catch (error) {
    console.error("AddCartProduct error:", error);
  }
};

export const RemoveCartProduct = async (productId, setCartProducts) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToCart/remove-from-cart/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      await getCartItems(setCartProducts);
    }
  } catch (error) {
    console.error("RemoveCartProduct error:", error);
  }
};

export const RemoveCartProductCompletely = async (
  productId,
  setCartProducts
) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToCart/remove-from-cart-complete/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      await getCartItems(setCartProducts);
    }
  } catch (error) {
    console.error("RemoveCartProductCompletely error:", error);
  }
};

export const getCartItems = async (setCartProducts) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart/get-cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();
    if (result?.data) {
      setCartProducts(result.data);
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
  }
};

//create Product
export const createProduct = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/orders/create-product`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Failed to create product");

    return result; // ✅ return result so you can handle it in the caller
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // ❌ throw again so the caller knows it failed
  }
};
export const createOrder = async (
  products,
  totalAmount,
  addressData,
  setShowConfirmation
) => {
  try {
    const response = await fetch(`${apiUrl}/orders/create-order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: products,
        totalAmount: totalAmount,
        paymentMethod: "Cash",
        deliveryAddress: addressData,
      }),
    });

    const result = await response.json();
    setShowConfirmation(true);
    if (!response.ok)
      throw new Error(result.message || "Failed to create product");

    return result; // ✅ return result so you can handle it in the caller
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // ❌ throw again so the caller knows it failed
  }
};
export const clearCart = async (setShowConfirmation) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart/clear-cart`, {
      method: "DELETE",
      credentials: "include", // ensures cookies are sent for authentication
    });

    const result = await response.json();
    setShowConfirmation(true);
    if (!response.ok) {
      throw new Error(result.message || "Failed to clear cart");
    }

    return result; // ✅ success response
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error; // ❌ re-throw for error handling in UI
  }
};
