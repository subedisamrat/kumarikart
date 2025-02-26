import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(cartItem?.quantity);

  function handleUpdateQuantity(getCartItem, typeofAction) {
    const newQuantity =
      typeofAction === "plus" ? quantity + 1 : Math.max(quantity - 1, 1);

    setQuantity(newQuantity);
    updateQuantity(getCartItem, newQuantity);
  }

  function handleQuantityChange(event) {
    const value = event.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setQuantity(value);
    }
  }

  function handleQuantityBlur(getCartItem) {
    const newQuantity = Math.max(parseInt(quantity) || 1, 1);
    setQuantity(newQuantity);
    updateQuantity(getCartItem, newQuantity);
  }

  function updateQuantity(getCartItem, newQuantity) {
    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: newQuantity,
      }),
    ).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Success",
          description: "Cart item updated!",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId }),
    ).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Success",
          description: "Cart item deleted!",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-3 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>

          <input
            type="text"
            className="w-12 text-center border border-gray-300 rounded"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={() => handleQuantityBlur(cartItem)}
          />

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          Rs.{" "}
          {(
            (cartItem?.salePrice < cartItem?.price
              ? cartItem?.salePrice
              : cartItem?.price) * quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
