import React, { useState } from "react";
import img from "../../assets/banners/account.webp";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

const ShoppingCheckout = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

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

  function handleInitiatePaypalPayment() {
    if (cartItems.legth === 0) {
      toast({
        title: "Oops! Something went wrong ❌",
        description: "You cart is empty, please add items to the cart",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Oops! Something went wrong ❌",
        description: "Please selected any one address to proceed the payment",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice < singleCartItem.price
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdatedDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    //console.log(orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data);
      if (data.payload.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  //console.log(currentSelectedAddress, "csa");
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-5">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item._id || item.productId}
                  cartItem={item}
                />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isPaymentStart
                ? "Processing paypal payment....."
                : " Check out via paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
