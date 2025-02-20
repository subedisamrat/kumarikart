import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingViewHeader from "./header";

const Shoppinglayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <ShoppingViewHeader />
      <main className="flex flex-col w-full ">
        <Outlet />
      </main>
    </div>
  );
};

export default Shoppinglayout;
