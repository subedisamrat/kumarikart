import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingViewHeader from "./header";
import Footer from "../shopping-view/footer";

const Shoppinglayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <ShoppingViewHeader />
      <main className="flex flex-col w-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Shoppinglayout;
