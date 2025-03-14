// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import CommonForm from "../common/form";
// import { addressFormControls } from "@/config";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addNewAddress,
//   deleteAddress,
//   editAddress,
//   fetchAllAddresses,
// } from "@/store/shop/address-slice";
// import { useToast } from "../ui/use-toast";
// import { Trash2, Edit } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// const initialAddressFormData = {
//   address: "",
//   city: "",
//   phone: "",
//   pincode: "",
//   notes: "",
// };

// const Address = ({ setCurrentSelectedAddress }) => {
//   const [formData, setFormData] = useState(initialAddressFormData);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
//   const [deleteDialog, setDeleteDialog] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { addressList } = useSelector((state) => state.shopAddress);
//   const { toast } = useToast();

//   function handleManageAddress(e) {
//     e.preventDefault();

//     if (addressList.length >= 3 && currentEditedId === null) {
//       setFormData(initialAddressFormData);
//       toast({
//         title: `Error ❌`,
//         description: "You can add a maximum of 3 addresses only!",
//       });
//       return;
//     }

//     currentEditedId !== null
//       ? dispatch(
//           editAddress({
//             userId: user?.id,
//             addressId: currentEditedId,
//             formData,
//           }),
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(user?.id));
//             setCurrentEditedId(null);
//             setFormData(initialAddressFormData);
//             toast({
//               title: `Success ✅`,
//               description: "Address updated successfully!",
//             });
//           }
//         })
//       : dispatch(
//           addNewAddress({
//             ...formData,
//             userId: user?.id,
//           }),
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(user?.id));
//             setFormData(initialAddressFormData);
//             toast({
//               title: `Success ✅`,
//               description: "Address added successfully!",
//             });
//           }
//         });
//   }

//   function handleDeleteAddress() {
//     dispatch(
//       deleteAddress({ userId: user?.id, addressId: selectedAddress?._id }),
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllAddresses(user?.id));
//         toast({
//           title: `Success ✅`,
//           description: "Address deleted successfully!",
//         });
//         setDeleteDialog(false);
//       }
//     });
//   }

//   function handleEditAddress(getCurrentAddress) {
//     setCurrentEditedId(getCurrentAddress?._id);
//     setFormData({
//       address: getCurrentAddress?.address,
//       phone: getCurrentAddress?.phone,
//       pincode: getCurrentAddress?.pincode,
//       city: getCurrentAddress?.city,
//       notes: getCurrentAddress?.notes,
//     });
//   }

//   function openDeleteDialog(getCurrentAddress) {
//     setSelectedAddress(getCurrentAddress);
//     setDeleteDialog(true);
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .map((key) => formData[key].trim() !== "")
//       .every((item) => item);
//   }

//   useEffect(() => {
//     dispatch(fetchAllAddresses(user?.id));
//   }, [dispatch]);

//   return (
//     <Card>
//       <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-3">
//         {addressList?.length > 0
//           ? addressList.map((singleAddressItem) => (
//               <div
//                 key={singleAddressItem._id}
//                 className="border p-4 rounded-lg shadow-md flex flex-col gap-2"
//               >
//                 <p className="font-medium">{singleAddressItem.address}</p>
//                 <p className="text-sm font-semibold text-gray-700">
//                   City:{" "}
//                   <span className="font-normal text-gray-500">
//                     {singleAddressItem.city}
//                   </span>
//                 </p>
//                 <p className="text-sm font-semibold text-gray-700">
//                   Pincode:{" "}
//                   <span className="font-normal text-gray-500">
//                     {singleAddressItem.pincode}
//                   </span>
//                 </p>
//                 <p className="text-sm font-semibold text-gray-700">
//                   Phone:{" "}
//                   <span className="font-normal text-gray-500">
//                     {singleAddressItem.phone}
//                   </span>
//                 </p>
//                 <p className="text-sm font-semibold text-gray-700">
//                   Notes:{" "}
//                   <span className="font-normal text-gray-500">
//                     {singleAddressItem.notes}
//                   </span>
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleEditAddress(singleAddressItem)}
//                   >
//                     <Edit className="w-5 h-5 text-blue-600 hover:text-blue-700" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => openDeleteDialog(singleAddressItem)}
//                   >
//                     <Trash2 className="w-5 h-5 text-red-600 hover:text-red-700" />
//                   </Button>
//                 </div>
//               </div>
//             ))
//           : null}

//       </div>
//       <CardHeader>
//         <CardTitle>
//           {currentEditedId !== null ? "Edit Address" : "Add New Address"}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <CommonForm
//           formControls={addressFormControls}
//           formData={formData}
//           setFormData={setFormData}
//           buttonText={currentEditedId !== null ? "Edit" : "Add"}
//           onSubmit={handleManageAddress}
//           isButtonDisabled={!isFormValid()}
//         />
//       </CardContent>
//       <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Delete</DialogTitle>
//           </DialogHeader>
//           <p>Are you sure you want to delete this address?</p>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialog(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteAddress}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default Address;

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);

  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(e) {
    e.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            currentEditedId: formData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      city: getCurrentAddress?.city,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  //console.log("address list", addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
