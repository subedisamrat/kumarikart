import React, { useEffect, useState } from "react";
//Banner Images
import kumariBanner from "../../assets/banners/kumaribanner.webp";
import bannerOne from "../../assets/banners/banner-1.webp";
import bannerTwo from "../../assets/banners/banner-2.webp";
import bannerThree from "../../assets/banners/banner-3.webp";
//Brand Icons
import adidasIcon from "../../assets/brands/adidas.svg";
import nikeIcon from "../../assets/brands/nike.svg";
import pumaIcon from "../../assets/brands/puma.webp";
import hnmIcon from "../../assets/brands/h&m.webp";
import chanelIcon from "../../assets/brands/chanel.webp";
import leviIcon from "../../assets/brands/levi's.webp";
//Category Images
import menIcon from "../../assets/categories/men.jpg";
import kidsIcon from "../../assets/categories/kids.webp";
import womenIcon from "../../assets/categories/women.webp";
import { Button } from "@/components/ui/button";
import {
  Blocks,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Footprints,
  ShirtIcon,
  Wrench,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: menIcon },
  { id: "kids", label: "Kids", icon: kidsIcon },
  { id: "women", label: "Women", icon: womenIcon },
  { id: "accessories", label: "Accessories", icon: Wrench },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandwithIcon = [
  { id: "chanel", label: "Chanel", icon: chanelIcon },
  { id: "adidas", label: "Adidas", icon: adidasIcon },
  { id: "nike", label: "Nike", icon: nikeIcon },
  { id: "puma", label: "Puma", icon: pumaIcon },
  { id: "levi", label: "Levi's", icon: leviIcon },
  { id: "h&m", label: "H&M", icon: hnmIcon },
  //{ id: "zara", label: "Zara", icon: Coffee },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const slides = [kumariBanner, bannerOne, bannerTwo, bannerThree];
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilters = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    //console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // function handleAddtoCart(getCurrentProductId) {
  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 1,
  //     }),
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Success",
  //         description: "Product added to the cart",
  //         outline: "none",
  //       });
  //     }
  //   });
  //   //console.log(getCurrentProductId);
  // }

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
          variant: "outline",
          description: "Product added to the cart",
        });
      }
    });
    //console.log(getCurrentProductId);
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  //console.log("product list", productList);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))} */}

            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {typeof categoryItem.icon === "string" ? (
                    <img
                      src={categoryItem.icon}
                      alt={categoryItem.label}
                      className="w-12 h-12 mb-4"
                    />
                  ) : (
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  )}
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* {brandwithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))} */}

            {brandwithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {typeof brandItem.icon === "string" ? (
                    <img
                      src={brandItem.icon}
                      alt={brandItem.label}
                      className="w-12 h-12 mb-4"
                    />
                  ) : (
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  )}
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <ShoppingProductTile
                    key={productItem._id || index}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
