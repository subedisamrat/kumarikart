import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

// to fix: button disabled while editing

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedID,
  handleDelete,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
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
          <h2 className="text-xl font-bold mb-2 mt-2 text-balance">
            {product?.title}
          </h2>

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
              className={`${
                product?.salePrice < product?.price ? "line-through " : ""
              } text-lg font-semibold text-primary`}
            >
              Rs.{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">Rs.{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedID(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
