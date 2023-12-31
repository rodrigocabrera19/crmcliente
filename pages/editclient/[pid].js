import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
// Alert message
import Swal from "sweetalert2";

// Formik
import { Formik } from "formik";
import * as Yup from "yup";

// Graphql
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    getClient(id: $id) {
      name
      lastName
      telephone
      email
      business
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      name
      lastName
    }
  }
`;
const EditClient = () => {
  // Get current id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Get current client
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: { id },
  });
  // Update current client
  const [updateClient] = useMutation(UPDATE_CLIENT);

  // Yup validation schema
  const schemaValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last name is required"),
    business: Yup.string().required("Business is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is no valid"),
  });

  if (loading) return <h1>Loading...</h1>;
  const { getClient } = data;

  // Upadte client in db
  const handleUpdate = async (values) => {
    console.log(values);
    const { name, lastName, business, email, telephone } = values;
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: { name, lastName, business, email, telephone },
        },
      });
      // Sweet alert
      Swal.fire("Update client", "Client updated successfully", "success");

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light ">Edit client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getClient}
            onSubmit={(values) => handleUpdate(values)}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="name"
                      placeholder="Client name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </div>
                  {props.touched.name && props.errors.name && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="lastName"
                    >
                      Last name
                    </label>

                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="lastName"
                      placeholder="Client last name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.lastName}
                    />
                  </div>
                  {props.touched.lastName && props.errors.lastName && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.lastName}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="business"
                    >
                      Business
                    </label>

                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="business"
                      placeholder="Client business"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.business}
                    />
                  </div>
                  {props.touched.business && props.errors.business && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.business}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="email"
                      placeholder="Client email address"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />
                  </div>
                  {props.touched.email && props.errors.email && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="telephone"
                    >
                      Telephone
                    </label>

                    <input
                      type="tel"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="telephone"
                      placeholder="Client telephone address"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telephone}
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Editar cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditClient;
