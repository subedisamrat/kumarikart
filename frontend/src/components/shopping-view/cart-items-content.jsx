import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { useState, useEffect } from "react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const productIndex = productList.findIndex(
    (product) => product._id === cartItem?.productId,
  );

  const totalStock = productList[productIndex]?.totalStock || 0;

  const productPrice =
    cartItem?.salePrice < cartItem?.price && cartItem?.salePrice > 0
      ? cartItem?.salePrice
      : cartItem?.price;

  const [quantity, setQuantity] = useState(cartItem?.quantity);
  const isOutOfStock = totalStock === 0;

  useEffect(() => {
    if (isOutOfStock) {
      dispatch(
        deleteCartItems({
          userId: user?.id,
          productId: cartItem?.productId,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Item is out of stock and has been removed from cart",
            variant: "destructive",
          });
        }
      });
    }
  }, [isOutOfStock]);

  function handleUpdateQuantity(getCartItem, actionType) {
    let newQuantity =
      actionType === "plus" ? quantity + 1 : Math.max(quantity - 1, 1);

    if (newQuantity > totalStock) {
      toast({
        title: `Only ${totalStock} item(s) available in stock`,
        variant: "destructive",
      });
      return;
    }

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
    let newQuantity = parseInt(quantity) || 1;

    if (newQuantity > totalStock) {
      toast({
        title: `Only ${totalStock} item(s) available in stock`,
        variant: "destructive",
      });
      newQuantity = 1;
    }

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
    );
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Item removed from cart",
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
        className={`w-20 h-20 rounded object-cover ${
          isOutOfStock ? "opacity-50" : ""
        }`}
      />
      <div className="flex-1">
        <h3 className={`font-extrabold ${isOutOfStock ? "text-red-500" : ""}`}>
          {cartItem?.title} {isOutOfStock && "(Out of Stock)"}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={quantity === 1 || isOutOfStock}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <input
            type="text"
            className={`w-12 text-center border rounded ${
              isOutOfStock ? "border-red-500" : "border-gray-300"
            }`}
            value={quantity}
            disabled={isOutOfStock}
            onChange={handleQuantityChange}
            onBlur={() => handleQuantityBlur(cartItem)}
          />

          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={quantity >= totalStock || isOutOfStock}
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          Rs. {(productPrice * quantity).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-1"
          onClick={() => handleCartItemDelete(cartItem)}
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
