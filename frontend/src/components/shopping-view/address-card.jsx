import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { EditIcon, Trash } from "lucide-react";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[2px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid gap-6 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City:{addressInfo?.city}</Label>
        <Label>PinCode:{addressInfo?.pincode}</Label>
        <Label>Phone:{addressInfo?.phone}</Label>
        <Label>Notes:{addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex gap-5 p-1 my-5 cursor-pointer">
        <EditIcon onClick={() => handleEditAddress(addressInfo)} />
        <Trash onClick={() => handleDeleteAddress(addressInfo)} />
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
