import { useLocation } from "react-router-dom";
import { useState } from "react";
import { clearCart, createOrder } from "../utils/HandleProductAPIs";
import OrderConfirmationCard from "../components/OrderConfirmationCard";

function Checkout() {
  const location = useLocation();

  const subtotal = location.state?.total || 0;
  const products = location.state?.productIds;
  const tax = 1800;
  const totalAmount = subtotal + tax;

  const [addressData, setAddressData] = useState({
    street: "",
    zip: "",
    state: "Utter Pradesh",
    city: "Lucknow",
    phone: "",
    email: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddressData({
      ...addressData,
      [id]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setAddressData({
      ...addressData,
      [id.replace("select-", "")]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(products, totalAmount, addressData, setShowConfirmation);
    clearCart(setShowConfirmation);
    console.log("Address Data:", addressData);
    console.log("Order Details:", { subtotal, tax, totalAmount, products }); // Show confirmation card
  };

  // Show confirmation card if form was submitted
  if (showConfirmation) {
    return <OrderConfirmationCard />;
  }

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          {/* Progress Steps */}
          <ol className="items-center flex w-full max-w-2xl text-center text-md font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 after:border-blue-400">
              <span className="flex text-blue-400 items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                Cart
              </span>
            </li>
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 after:border-gray-200 dark:after:border-gray-700">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 text-blue-400 sm:after:hidden">
                Checkout
              </span>
            </li>
            <li className="flex shrink-0 items-center text-gray-400">
              Confirmation
            </li>
          </ol>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              {/* Address Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="street"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      id="street"
                      placeholder="123 Main St"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={addressData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Zip*
                    </label>
                    <input
                      type="text"
                      id="zip"
                      placeholder="226026"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={addressData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="select-state-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      State*
                    </label>
                    <select
                      id="select-state-input-3"
                      className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={addressData.state}
                      onChange={handleSelectChange}
                    >
                      <option value="Utter Pradesh">Utter Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chattisgarh">Chattisgarh</option>
                      <option value="Madhaya paradesh">Madhaya paradesh</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City*
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={addressData.city}
                      onChange={handleSelectChange}
                    >
                      <option value="Lucknow">Lucknow</option>
                      <option value="Ayodhya">Ayodhya</option>
                      <option value="varansi">Varansi</option>
                      <option value="pragraj">Pragraj</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number*
                    </label>
                    <div className="flex items-center">
                      <span className="inline-flex items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        +91
                      </span>
                      <input
                        type="text"
                        id="phone"
                        placeholder="123-456-7890"
                        className="block w-full rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        value={addressData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="name@example.com"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={addressData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <div className="flex items-center gap-2">
                  <input className="w-4 h-4" type="radio" defaultChecked />
                  <label className="text-gray-900 dark:text-white font-medium">
                    Payment on delivery
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {subtotal}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {tax}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {totalAmount}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
                >
                  Proceed to Payment
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  One or more items in your cart require an account.{" "}
                  <a
                    href="#"
                    className="text-primary-700 underline dark:text-primary-500"
                  >
                    Sign in or create an account now.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Checkout;
