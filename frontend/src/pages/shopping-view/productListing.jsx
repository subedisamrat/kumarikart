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
import { fetchFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

//should work in detail part where we add items to cart and then appear a dialog... date:2025-2-20 ts: 6:33:41

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
  const { productList = [] } = useSelector((state) => state.shopProducts);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

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
                key={productItem.id || idx}
                product={productItem}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-muted-foreground">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
