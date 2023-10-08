import React from "react";

const ProductSummary = ({ key, product }) => {
  const { name, price } = product;
  return (
    <section
      key={key}
      className="md:flex md:justify-between md:items-center mt-5"
    >
      <div className="md:w-2/4 mb-2 md:mb0">
        <p className="text-sm">{name}</p>
        <p className="text-sm">{price}</p>
      </div>

      <input
        type="number"
        placeholder="Quantity"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
      />
    </section>
  );
};

export default ProductSummary;
