import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";

// Graphql
import { useQuery } from "@apollo/client";
import GET_PRODUCTS from "../graphql/getProducts.graphql";
import Product from "@/components/Product";

export default function Products() {
  // Get products
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <h1>Loading...</h1>;

  console.log(data);
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light ">Productos</h1>
        <Link
          href="/newProduct"
          className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
        >
          New product
        </Link>
        <table className="table-auto shadow-md mt10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Exist</th>
              <th className="w-1/5 py-2">Price</th>
              <th colSpan={2} className="w-1/5 py-2">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.getProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
