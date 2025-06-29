// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import { getSearchResults, resetSearchResult } from "@/store/shop/search-slice";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// const SearchProducts = () => {
//   const [keyword, setKeyword] = useState("");
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   useEffect(() => {
//     const trimmedKeyword = keyword.trim();
//     if (trimmedKeyword.length > 3) {
//       const delayDebounceFn = setTimeout(() => {
//         setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
//         dispatch(getSearchResults(trimmedKeyword));
//       }, 800);
//       return () => clearTimeout(delayDebounceFn);
//     } else {
//       dispatch(resetSearchResult());
//     }
//   }, [keyword]);

//   const handleAddtoCart = (productId, totalStock) => {
//     const cartList = cartItems.items || [];
//     const existingItem = cartList.find((item) => item.productId === productId);

//     if (existingItem && existingItem.quantity + 1 > totalStock) {
//       return toast({
//         title: `Only ${existingItem.quantity} can be added for this item`,
//         variant: "destructive",
//       });
//     }

//     dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
//       (data) => {
//         if (data?.payload?.success) {
//           dispatch(fetchCartItems(user?.id));
//           toast({
//             title: "Success",
//             description: "✅ Product added to the cart!",
//           });
//         }
//       },
//     );
//   };

//   function handleGetProductDetails(getCurrentProductId) {
//     //console.log(getCurrentProductId);
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   return (
//     <div className="container mx-auto px-4 md:px-6 py-10">
//       <div className="w-full flex justify-center mb-8">
//         <Input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="🔍 Search for products..."
//           className="w-full max-w-2xl rounded-2xl shadow-md px-5 py-6 text-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
//         />
//       </div>

//       {!searchResults.length && keyword.length > 3 ? (
//         <div className="text-center mt-12">
//           <h2 className="text-3xl font-semibold text-gray-600 mb-2">
//             No results found 😔
//           </h2>
//           <p className="text-gray-500 text-lg">
//             Try searching with different keywords
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all">
//           {searchResults.map((item, index) => (
//             <div key={index} className="animate-fade-in">
//               <ShoppingProductTile
//                 handleAddtoCart={handleAddtoCart}
//                 product={item}
//                 handleGetProductDetails={handleGetProductDetails}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// };

// export default SearchProducts;

//current working code✅
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import { getSearchResults, resetSearchResult } from "@/store/shop/search-slice";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// const SearchProducts = () => {
//   const [keyword, setKeyword] = useState("");
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [isSearching, setIsSearching] = useState(false);
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   useEffect(() => {
//     const trimmedKeyword = keyword.trim();
//     if (trimmedKeyword.length > 3) {
//       setIsSearching(true);
//       const delayDebounceFn = setTimeout(() => {
//         setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
//         dispatch(getSearchResults(trimmedKeyword)).finally(() =>
//           setIsSearching(false),
//         );
//       }, 800);
//       return () => clearTimeout(delayDebounceFn);
//     } else {
//       dispatch(resetSearchResult());
//       setIsSearching(false);
//     }
//   }, [keyword]);

//   const handleAddtoCart = (productId, totalStock) => {
//     const cartList = cartItems.items || [];
//     const existingItem = cartList.find((item) => item.productId === productId);

//     if (existingItem && existingItem.quantity + 1 > totalStock) {
//       return toast({
//         title: `Only ${existingItem.quantity} can be added for this item`,
//         variant: "destructive",
//       });
//     }

//     dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
//       (data) => {
//         if (data?.payload?.success) {
//           dispatch(fetchCartItems(user?.id));
//           toast({
//             title: "Success",
//             description: "✅ Product added to the cart!",
//           });
//         }
//       },
//     );
//   };

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   return (
//     <div className="container mx-auto px-4 md:px-6 py-10">
//       <div className="w-full flex justify-center mb-8">
//         <Input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="🔍 Search for products..."
//           className="w-full max-w-2xl rounded-2xl shadow-md px-5 py-6 text-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-300"
//         />
//       </div>

//       {isSearching ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//         </div>
//       ) : searchResults.length === 0 && keyword.length > 3 ? (
//         <div className="text-center mt-12">
//           <h2 className="text-3xl font-semibold text-gray-600 mb-2">
//             No results found 😔
//           </h2>
//           <p className="text-gray-500 text-lg">
//             Try searching with different keywords
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all">
//           {searchResults.map((item, index) => (
//             <div key={index} className="animate-fade-in">
//               <ShoppingProductTile
//                 handleAddtoCart={handleAddtoCart}
//                 product={item}
//                 handleGetProductDetails={handleGetProductDetails}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// };

// export default SearchProducts;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getSearchResults, resetSearchResult } from "@/store/shop/search-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { searchResults, searchType } = useSelector(
    (state) => state.shopSearch,
  );
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  const { toast } = useToast();

  // Search with debounce
  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setSearchParams({ q: trimmedKeyword });
        dispatch(getSearchResults(trimmedKeyword)).finally(() =>
          setIsSearching(false),
        );
      }, 600);

      return () => clearTimeout(timer);
    } else {
      dispatch(resetSearchResult());
    }
  }, [keyword, dispatch, setSearchParams]);

  // Handle initial URL search
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery && urlQuery !== keyword) {
      setKeyword(urlQuery);
    }
  }, [searchParams]);

  // Handle product details
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleAddToCart = (productId, totalStock) => {
    const existingItem = cartItems.items?.find(
      (item) => item.productId === productId,
    );

    if (existingItem?.quantity >= totalStock) {
      toast({
        title: "Limit reached",
        description: `Maximum ${totalStock} can be added`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      () => {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to cart",
          description: "Product added successfully",
        });
      },
    );
  };

  const handleProductClick = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // No results component
  const NoResultsView = () => (
    <div className="text-center py-20">
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">
        No results found for "{keyword}"
      </h3>
      <p className="text-gray-500 mb-6">
        Try different keywords or browse our categories
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        {["shoes", "clothing", "accessories", "trending"].map((cat) => (
          <button
            key={cat}
            onClick={() => setKeyword(cat)}
            className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search input */}
      <div className="sticky top-0 bg-white z-10 py-4 mb-8">
        <div className="max-w-2xl mx-auto">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Try 'classic shoes for young generation' or 'trendy comfortable footwear'"
            className="w-full px-5 py-6 text-lg rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results area */}
      <div className="min-h-[60vh]">
        {isSearching ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : searchResults.length === 0 && keyword ? (
          <NoResultsView />
        ) : (
          <>
            {/* AI-enhanced search header */}
            {searchType === "ai_enhanced" && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-blue-800 mb-1">
                  ✨ Intelligent Results
                </h2>
                <p className="text-blue-600">
                  We found these products matching your description
                </p>
              </div>
            )}

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ShoppingProductTile
                  key={product._id}
                  product={product}
                  handleAddtoCart={handleAddToCart}
                  handleGetProductDetails={handleProductClick}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product details dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;
