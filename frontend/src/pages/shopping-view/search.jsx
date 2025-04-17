import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResult } from "@/store/shop/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword.length > 3) {
      const delayDebounceFn = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
        dispatch(getSearchResults(trimmedKeyword));
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    } else {
      dispatch(resetSearchResult());
    }
  }, [keyword]);

  const handleAddtoCart = (productId, totalStock) => {
    const cartList = cartItems.items || [];
    const existingItem = cartList.find((item) => item.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      return toast({
        title: `Only ${existingItem.quantity} can be added for this item`,
        variant: "destructive",
      });
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Success",
            description: "✅ Product added to the cart!",
          });
        }
      },
    );
  };

  function handleGetProductDetails(getCurrentProductId) {
    //console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="w-full flex justify-center mb-8">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="🔍 Search for products..."
          className="w-full max-w-2xl rounded-2xl shadow-md px-5 py-6 text-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
        />
      </div>

      {!searchResults.length && keyword.length > 3 ? (
        <div className="text-center mt-12">
          <h2 className="text-3xl font-semibold text-gray-600 mb-2">
            No results found 😔
          </h2>
          <p className="text-gray-500 text-lg">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all">
          {searchResults.map((item, index) => (
            <div key={index} className="animate-fade-in">
              <ShoppingProductTile
                handleAddtoCart={handleAddtoCart}
                product={item}
                handleGetProductDetails={handleGetProductDetails}
              />
            </div>
          ))}
        </div>
      )}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;
