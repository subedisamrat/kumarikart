import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice < product?.price ? (
            // <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            //   Sale
            // </Badge>
            <Badge className="cursor-pointer absolute top-2 left-2 bg-teal-500 text-white font-semibold rounded-full px-3 py-1 text-sm shadow-lg transform transition-all duration-300 ease-in-out hover:bg-teal-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl text-muted-foreground ">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-xl text-muted-foreground ">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salePrice < product?.price ? "line-through" : ""
              }`}
            >
              Rs. {product?.price}
            </span>

            {product?.salePrice < product?.price ? (
              <span className="text-lg font-semibold text-primary ">
                Rs.{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button>Out of Stock 😢</Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id)}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
