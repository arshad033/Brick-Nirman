import React, { useContext, useEffect, useState } from "react";
import {
  getCartItems,
  AddCartProduct,
  RemoveCartProduct,
  RemoveCartProductCompletely,
} from "../utils/HandleProductAPIs";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [loading, setLoading] = useState(true);
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      await getCartItems(setCartProducts);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading)
    return <p className="text-center text-white py-10">Loading cart...</p>;
  if (cartProducts.length === 0)
    return <p className="text-center text-white py-10">Cart is empty.</p>;

  const total = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity * 1000,
    0
  );

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-bold mb-20 text-center text-white sm:text-4xl">
            Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Cart Items Section */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartProducts.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 object-cover dark:hidden"
                          src={item.productId.image}
                          alt={item.productId.name}
                        />
                        <img
                          className="hidden h-20 w-20 object-cover dark:block"
                          src={item.productId.image}
                          alt={item.productId.name}
                        />
                      </a>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              RemoveCartProduct(
                                item.productId._id,
                                setCartProducts
                              )
                            }
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() =>
                              AddCartProduct(
                                item.productId._id,
                                item.price,
                                setCartProducts
                              )
                            }
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                          >
                            <svg
                              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {item.productId.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.productId.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              RemoveCartProductCompletely(
                                item.productId._id,
                                setCartProducts
                              )
                            }
                            type="button"
                            className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          >
                            ❌ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              {/* Quantity Note */}
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  🧱 <strong>Note:</strong> 1 quantity = 1000 bricks
                </p>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base text-gray-500 dark:text-gray-400">
                      Total Price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ₹{total}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ₹{total}
                    </dd>
                  </dl>
                </div>

                <button
                  onClick={() => {
                    console.log(cartProducts);

                    const productIds = cartProducts.map((item) => {
                      return {
                        productId: item.productId._id,
                        quantity: item.quantity,
                        price: item.price,
                      };
                    });
                    navigate("/checkout", {
                      state: {
                        productIds,
                        total,
                      },
                    });
                  }}
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
