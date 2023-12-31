import React from "react";
import Head from "next/head";
import Siderbar from "./Siderbar";
import { useRouter } from "next/router";
import Header from "./Header";
const Layout = ({ children }) => {
  // Routing de next
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Crm admin</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      {router.pathname === "/login" || router.pathname === "/register" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          {children}
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="flex min-h-screen">
            <Siderbar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
