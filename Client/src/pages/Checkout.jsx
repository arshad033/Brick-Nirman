function Checkout() {
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ol className="items-center flex w-full max-w-2xl text-center text-md font-medium text-gray-500 dark:text-gray-400 sm:text-base">
          {/* Step 1: Cart */}
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 after:border-blue-400">
            <span className="flex text-blue-400 items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              Cart
            </span>
          </li>

          {/* Step 2: Checkout */}
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 after:border-gray-200 dark:after:border-gray-700">
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 text-blue-400 sm:after:hidden">
              Checkout
            </span>
          </li>

          {/* Step 3: Confirmation */}
          <li className="flex shrink-0 items-center text-gray-400">Confirmation</li>
       </ol>


          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      for="your_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Street{" "}
                    </label>
                    <input
                      type="text"
                      id="your_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Bonnie Green"
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="your_email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      zip*{" "}
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="226026"
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        for="select-country-input-3"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        State*{" "}
                      </label>
                    </div>
                    <select
                      id="select-country-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>Utter Pradesh</option>
                      <option value="AS">Bihar</option>
                      <option value="FR">Chattisgarh</option>
                      <option value="ES">Madhaya paradesh</option>
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        for="select-city-input-3"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        City*{" "}
                      </label>
                    </div>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option value="NY">Lucknow</option>
                      <option value="LA">Ayodhya</option>
                      <option value="CH">varansi</option>
                      <option value="HU">pragraj</option>
                    </select>
                  </div>

                  <div>
                    <label
                      for="phone-input-3"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Phone Number*{" "}
                    </label>
                    <div className="flex items-center">
                      <button
                        id="dropdown-phone-button-3"
                        data-dropdown-toggle="dropdown-phone-3"
                        className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        +91
                      </button>

                      <div className="relative w-full">
                        <input
                          type="text"
                          id="phone-input"
                          className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder="123-456-7890"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="name@flowbite.com"
                      required
                    />
                  </div>

                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>

                <div className="ms-4 text-md flex items-center gap-2">
                    <input className="w-4 h-4 " type="radio" defaultChecked  />
                        <label
                          for="pay-on-delivery"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          {" "}
                          Payment on delivery{" "}
                        </label>
                        
                      </div>
              </div>

              <div>
                <label
                  for="voucher"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Enter a gift card, voucher or promotional code{" "}
                </label>
                <div className="flex max-w-md items-center gap-4">
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                  <button
                    type="button"
                    className="flex text-green-500 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $8,094.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">0</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $199
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      $8,392.00
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Payment
                </button>

                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  One or more items in your cart require an account.{" "}
                  <a
                    href="#"
                    title=""
                    className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Sign in or create an account now.
                  </a>
                  .
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
