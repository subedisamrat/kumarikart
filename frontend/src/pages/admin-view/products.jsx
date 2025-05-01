import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/form";
import ProductImage from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
} from "@/store/admin/products-slice";
import { useToast } from "@/components/ui/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
  size: [],
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");

  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currentEditedId, setCurrentEditedID] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();

  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          }),
        ).then((data) => {
          //console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchProduct());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedID(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImage,
          }),
        ).then((data) => {
          //console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchProduct());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product added successfully",
            });
          }
          // else {
          //   toast({
          //     title: "Error",
          //     description:
          //       "All fields are required, and price & stock must be valid numbers!",
          //   });
          // }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Product deleted successfully",
        });
      }
    });
    dispatch(fetchProduct());
  }

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Updated productList:", productList);
  // }, [productList]);

  //console.log("productlist", formData);

  return (
    <Fragment>
      <div className="mb-5  w-full flex justify-end">
        <Button
          className=" bg-blue-600 hover:bg-blue-700"
          onClick={() => setOpenCreateProductsDialog(true)}
        >
          Add Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                setCurrentEditedID={setCurrentEditedID}
                key={productItem.id || productItem._id}
                product={productItem}
                handleDelete={handleDelete}
                currentEditedId={currentEditedId}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedID(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add new Product"}{" "}
            </SheetTitle>
          </SheetHeader>
          <ProductImage
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 ">
            <CommonForm
              isButtonDisabled={!isFormValid()}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
