import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addProductReview, getProductReviews } from "@/store/shop/review-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getProductReviews(productDetails?._id));
        toast({
          title: "Success",
          description: "Your review has been recorded ✅",
        });
      } else {
        setRating(0);
        setReviewMsg("");
        toast({
          title: "❌ Error",
          description:
            "Failed to record review, Please buy the product first to review!!",
        });
        return;
      }
      //console.log(data);
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Success",
          description: "Product added to the cart ✅",
        });
      }
    });
    //console.log(getCurrentProductId);
  }

  // const saveGuestCartToLocalStorage = (cart) => {
  //   localStorage.setItem("guest_cart", JSON.stringify(cart));
  // };

  // const getGuestCartFromLocalStorage = () => {
  //   const cart = localStorage.getItem("guest_cart");
  //   return cart ? JSON.parse(cart) : [];
  // };

  // function handleAddtoCart(getCurrentProductId, getTotalStock) {
  //   // Guest User
  //   if (!user?.id) {
  //     let guestCart = getGuestCartFromLocalStorage();

  //     const existingItem = guestCart.find(
  //       (item) => item.productId === getCurrentProductId,
  //     );

  //     if (existingItem) {
  //       if (existingItem.quantity + 1 > getTotalStock) {
  //         toast({
  //           title: `Only ${existingItem.quantity} quantity can be added for this item`,
  //           variant: "destructive",
  //         });
  //         return;
  //       }
  //       existingItem.quantity += 1;
  //     } else {
  //       guestCart.push({ productId: getCurrentProductId, quantity: 1 });
  //     }

  //     saveGuestCartToLocalStorage(guestCart);

  //     toast({
  //       title: "Added to Guest Cart",
  //       description: "Login to preserve your cart.",
  //     });

  //     return;
  //   }

  //   // Logged-in User
  //   dispatch(
  //     addToCart({
  //       userId: user.id,
  //       productId: getCurrentProductId,
  //       quantity: 1,
  //     }),
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user.id));
  //       toast({
  //         title: "Success",
  //         variant: "outline",
  //         description: "Product added to the cart",
  //       });
  //     }
  //   });
  // }

  if (!productDetails) return null;

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        aria-describedby={undefined}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
      >
        {/* Left Side: Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col gap-4">
          <div>
            <DialogTitle className="text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            <p className="text-muted-foreground text-lg mt-2">
              {productDetails?.description || "No description available."}
            </p>
          </div>

          <Separator />

          {/* Price & Sale Price in One Row */}
          <div className="flex items-center justify-between gap-2 sm:gap-8">
            <p
              className={`text-3xl font-bold ${
                productDetails.salePrice < productDetails.price
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              }`}
            >
              Rs. {productDetails.price}
            </p>
            {productDetails.salePrice < productDetails.price && (
              <p className="text-3xl font-bold text-primary">
                Rs. {productDetails.salePrice}
              </p>
            )}
          </div>

          {/* Product rating  */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              {averageReview.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart Button Below */}
          <div className="mt-5 mb-5">
            {/* {productDetails?.totalStock === 0 ? (
              <Button
                onClick={() => handleAddtoCart(productDetails?._id)}
                className="mt-2 w-full opacity-60 cursor-not-allowed"
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock,
                  )
                }
                className="mt-2 w-full"
              >
                Add to Cart
              </Button>
            )} */}
            <Button
              onClick={() =>
                productDetails?.totalStock > 0 &&
                handleAddtoCart(productDetails?._id, productDetails?.totalStock)
              }
              className={`mt-2 w-full ${
                productDetails?.totalStock === 0
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              disabled={productDetails?.totalStock === 0}
            >
              {productDetails?.totalStock === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          </div>
          <Separator />

          {/* For comment section with reviews */}

          <div className="max-h-[300px] overflow-auto">
            <h2 className="font-bold text-xl mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItm) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItm?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItm?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItm.reviewValue} />
                        {/* <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" /> */}
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItm.reviewMsg}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
              {/* <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Samrat Subedi</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This product is nice!</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Samrat Subedi</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This product is nice!</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Samrat Subedi</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">This product is nice!</p>
                </div>
              </div> */}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <Label>Post your review</Label>
              <div className="flex gap-2">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                onChange={(e) => setReviewMsg(e.target.value)}
                name="reviewMsg"
                value={reviewMsg}
                placeholder="write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
