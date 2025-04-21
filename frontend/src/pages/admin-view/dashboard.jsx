import ProductImage from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // function handleUploadFeatureImage() {
  //   dispatch(addFeatureImage(uploadedImage)).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(getFeatureImages());
  //       setImageFile(null);
  //       setUploadedImage("");
  //       toast({ title: "Image uploaded successfully ✅" });
  //     } else {
  //       toast({ title: "Failed to upload image", variant: "destructive" });
  //     }
  //   });
  // }

  function handleUploadFeatureImage() {
    // Check if an image is selected
    if (!uploadedImage) {
      toast({
        title: "Please select an image first",
        variant: "destructive",
      });
      return; // Exit the function early
    }

    dispatch(addFeatureImage(uploadedImage)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImage("");
        toast({ title: "Image uploaded successfully ✅" });
      } else {
        toast({
          title: "Error",
          description: "Failed to upload image",
        });
      }
    });
  }
  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: "Image deleted successfully" });
          // Optional: Only needed if you're not updating state in Redux
          // dispatch(getFeatureImages());
        } else {
          toast({
            title: "Error" || "Failed to delete image",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error deleting image",
          variant: "destructive",
          description: error.message,
        });
      });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      {/* Upload Image Section */}
      <ProductImage
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button
        disabled={!uploadedImage}
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full"
      >
        Upload
      </Button>

      {/* Feature Images Preview */}
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImageItm) => (
            <div
              key={featureImageItm._id}
              className="relative border rounded-lg overflow-hidden"
            >
              <img
                src={featureImageItm.image}
                className="w-full h-[300px] object-cover"
                alt="feature"
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this image?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleDeleteFeatureImage(featureImageItm._id)
                      }
                    >
                      Yes, delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-gray-500">
            No feature images found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
