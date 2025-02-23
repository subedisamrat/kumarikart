// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import React from "react";
// import { Button } from "../ui/button";
// import { Separator } from "../ui/separator";

// const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
//   if (!productDetails) return null;
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent
//         aria-describedby={undefined}
//         className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
//       >
//         <div className="relative overflow-hidden rounded-lg">
//           <img
//             src={productDetails?.image}
//             alt={productDetails?.title}
//             width={600}
//             height={600}
//             className="aspect-square w-full object-cover"
//           />
//           <DialogTitle>
//             <div className="grid gap-6">
//               <div>
//                 <h1 className="text-3xl font-extrabold mt-2">
//                   {productDetails?.title}
//                 </h1>
//                 <p className="text-muted-foreground text-2xl mt-2">
//                   "{productDetails.description}"
//                 </p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p
//                   className={`text-3xl font-bold text-primary ${
//                     productDetails.salePrice < productDetails.price
//                       ? "line-through"
//                       : ""
//                   }`}
//                 >
//                   Rs.{productDetails.price}
//                 </p>
//                 {productDetails.salePrice < productDetails.price ? (
//                   <p className="text-2xl font-bold text-muted-foreground">
//                     Rs.{productDetails.salePrice}
//                   </p>
//                 ) : (
//                   nulll
//                 )}
//               </div>
//               <div>
//                 <Button className="mt-2 w-full">Add to Cart</Button>
//               </div>
//             </div>
//             <Separator />
//           </DialogTitle>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProductDetailsDialog;

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  if (!productDetails) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">{5}</span>
          </div>

          {/* Add to Cart Button Below */}
          <div className="mt-5 mb-5">
            <Button className="mt-2 w-full">Add to Cart</Button>
          </div>
          <Separator />

          {/* For comment section with reviews */}

          <div className="max-h-[300px] overflow-auto">
            <h2 className="font-bold text-xl mb-4">Reviews</h2>
            <div className="grid gap-6">
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
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
