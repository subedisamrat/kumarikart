import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { EditIcon, Trash } from "lucide-react";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
}) => {
  return (
    <Card>
      <CardContent className="grid gap-6 p-4 ">
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
