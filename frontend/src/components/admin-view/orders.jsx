import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import AdminOrderDetailsView from "./order-details";
import { Dialog } from "../ui/dialog";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>235463575</TableCell>
                <TableCell>2025/03/9</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Rs. 6900</TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={setOpenDetailsDialog}
                  >
                    <Button
                      onClick={() => setOpenDetailsDialog(true)}
                      className=" bg-blue-600 hover:bg-blue-700"
                    >
                      View Details
                    </Button>
                    <AdminOrderDetailsView />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default AdminOrdersView;
