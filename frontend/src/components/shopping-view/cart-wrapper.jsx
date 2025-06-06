import React, { useEffect, useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const hasInvalidItem = cartItems?.some((item) => item.quantity < 1);
    setIsCheckoutDisabled(hasInvalidItem);
  }, [cartItems]);

  const totalCartAmount =
    cartItems?.reduce(
      (sum, currentItem) =>
        sum +
        (currentItem?.salePrice < currentItem?.price
          ? currentItem?.salePrice
          : currentItem?.price) *
          currentItem?.quantity,
      0,
    ) || 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs.{totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
      >
        CheckOut
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
