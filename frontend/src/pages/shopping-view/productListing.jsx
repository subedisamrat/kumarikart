import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    //check if category is selected or not
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  //console.log(queryParams);
  return queryParams.join("&");
}

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { productList = [], productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    //console.log(value);
    setSort(value);
  }

  //📕 Algorithms used to filter products based on the selected filters 📕.

  function handleFilter(getSectionId, getCurrentOptions) {
    //console.log(getCurrentOptions, getSectionId);

    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    //checking if category and brand exists or not
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOptions);

      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOptions);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    //console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // function handleAddtoCart(getCurrentProductId, getTotalStock) {
  //   let getCartItems = cartItems.items || [];

  //   if (getCartItems.length) {
  //     const indexOfCurrentItem = getCartItems.findIndex(
  //       (item) => item.productId === getCurrentProductId,
  //     );

  //     if (indexOfCurrentItem > -1) {
  //       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
  //       if (getQuantity + 1 > getTotalStock) {
  //         toast({
  //           title: "❌ Item limit reached",
  //           description: `Only ${getQuantity} quantity can be added for this item!`,
  //         });
  //         return;
  //       }
  //     }
  //   }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    //console.log(cartItems);

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
          description: "✅ Product added to the cart!",
        });
      }
    });
    //console.log(getCurrentProductId);
  }

  //chat gpt code
  // function handleAddtoCart(getCurrentProductId, getTotalStock) {
  //   //🔒 Check if user is logged in
  //   if (!user || !user.id) {
  //     toast({
  //       title: "❌ Login Required",
  //       description: "Redirecting to login page...",
  //       variant: "destructive",
  //     });

  //     setTimeout(() => {
  //       navigate("/auth/login");
  //     }, 1500);
  //     return;
  //   }

  //   let getCartItems = cartItems.items || [];

  //   if (getCartItems.length) {
  //     const indexOfCurrentItem = getCartItems.findIndex(
  //       (item) => item.productId === getCurrentProductId,
  //     );
  //     if (indexOfCurrentItem > -1) {
  //       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
  //       if (getQuantity + 1 > getTotalStock) {
  //         toast({
  //           title: `Only ${getQuantity} quantity can be added for this item`,
  //           variant: "destructive",
  //         });
  //         return;
  //       }
  //     }
  //   }

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
  //         description: "✅ Product added to the cart!",
  //       });
  //     }
  //   });
  // }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchFilteredProducts({ filterParams: filters, sortParams: sort }),
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  //console.log("product details", productDetails);
  //console.log(productList);
  //console.log("SearchParams", searchParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm ">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-2xl font-extrabold ">All products</h2>
          <div className="flex  items-center gap-12">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem, idx) => (
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                key={productItem.id || idx}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-muted-foreground">
              No products found.
            </p>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingList;
