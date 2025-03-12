import React from "react";
import img from "../../assets/banners/account.webp";
import Address from "@/components/shopping-view/address";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const totalCartAmount =
    cartItems?.items?.reduce(
      (sum, currentItem) =>
        sum +
        (currentItem?.salePrice < currentItem?.price
          ? currentItem?.salePrice
          : currentItem?.price) *
          currentItem?.quantity,
      0,
    ) || 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-5">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Check out via paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
