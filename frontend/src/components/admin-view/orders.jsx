import React from "react";
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

const AdminOrdersView = () => {
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
                  <Button>View Details</Button>
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
