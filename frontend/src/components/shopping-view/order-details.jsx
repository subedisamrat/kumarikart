import React from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-7 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>12342423</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>2025/03/12</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Total Price</p>
            <Label>Rs. 69</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>Pending</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between mt-3">
                <span>Product One</span>
                <span>Rs.69</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Information</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Micahel Bhatta</span>
              <span>Kathmandu</span>
              <span>Putalisadak</span>
              <span>44600</span>
              <span>98354645345</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
