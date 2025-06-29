// import React, { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// import {
//   Table,
//   TableHead,
//   TableHeader,
//   TableBody,
//   TableCell,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import AdminOrderDetailsView from "./order-details";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
// import { Badge } from "../ui/badge";

// const AdminOrdersView = () => {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [currentOrderId, setCurrentOrderId] = useState(null);
//   const dispatch = useDispatch();

//   const { orderList, orderDetails, loading } = useSelector(
//     (state) => state.adminOrder,
//   );

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin());
//   }, [dispatch]);

//   const handleViewDetails = (orderId) => {
//     setCurrentOrderId(orderId);
//     setOpenDetailsDialog(true);
//   };

//   useEffect(() => {
//     if (openDetailsDialog && currentOrderId) {
//       dispatch(getOrderDetailsForAdmin(currentOrderId));
//     }
//   }, [openDetailsDialog, currentOrderId, dispatch]);

//   const handleCloseDialog = () => {
//     setOpenDetailsDialog(false);
//     dispatch(resetOrderDetails());
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>All Orders</CardTitle>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Order Date</TableHead>
//                 <TableHead>Order Status</TableHead>
//                 <TableHead>Order Price</TableHead>
//                 <TableHead>
//                   <span className="sr-only">Details</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {orderList && orderList.length > 0
//                 ? orderList.map((orderItem) => (
//                     <TableRow key={orderItem?._id}>
//                       <TableCell>{orderItem?._id}</TableCell>
//                       <TableCell>
//                         {orderItem?.orderDate
//                           ? orderItem.orderDate.split("T")[0]
//                           : "N/A"}
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           className={`py-1 px-3 ${
//                             orderItem?.orderStatus === "confirmed"
//                               ? "bg-green-500"
//                               : orderItem?.orderStatus === "rejected"
//                               ? "bg-red-500"
//                               : "bg-black"
//                           }`}
//                         >
//                           {orderItem?.orderStatus}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>Rs. {orderItem?.totalAmount}</TableCell>
//                       <TableCell>
//                         <Button
//                           onClick={() => handleViewDetails(orderItem?._id)}
//                           className="bg-blue-600 hover:bg-blue-700"
//                         >
//                           View Details
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 : null}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </CardHeader>

//       {/* Single Dialog outside the table */}
//       <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
//         <DialogContent>
//           {loading ? (
//             <p>Loading order details...</p>
//           ) : orderDetails ? (
//             <AdminOrderDetailsView orderDetails={orderDetails} />
//           ) : (
//             <p>Could not load order details</p>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default AdminOrdersView;

//✅✅✅✅

// import React, { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// import {
//   Table,
//   TableHead,
//   TableHeader,
//   TableBody,
//   TableCell,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import AdminOrderDetailsView from "./order-details";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
// import { Badge } from "../ui/badge";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Label } from "../ui/label";

// const AdminOrdersView = () => {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [currentOrderId, setCurrentOrderId] = useState(null);
//   const [filters, setFilters] = useState({
//     dateFrom: "",
//     dateTo: "",
//     status: "",
//     minPrice: "",
//     maxPrice: "",
//   });
//   const dispatch = useDispatch();

//   const { orderList, orderDetails, loading } = useSelector(
//     (state) => state.adminOrder,
//   );

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin());
//   }, [dispatch]);

//   const handleViewDetails = (orderId) => {
//     setCurrentOrderId(orderId);
//     setOpenDetailsDialog(true);
//   };

//   useEffect(() => {
//     if (openDetailsDialog && currentOrderId) {
//       dispatch(getOrderDetailsForAdmin(currentOrderId));
//     }
//   }, [openDetailsDialog, currentOrderId, dispatch]);

//   const handleCloseDialog = () => {
//     setOpenDetailsDialog(false);
//     dispatch(resetOrderDetails());
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleStatusChange = (value) => {
//     setFilters((prev) => ({
//       ...prev,
//       status: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       dateFrom: "",
//       dateTo: "",
//       status: "",
//       minPrice: "",
//       maxPrice: "",
//     });
//   };

//   const filteredOrders = orderList?.filter((order) => {
//     // Filter by date range
//     if (filters.dateFrom && filters.dateTo) {
//       const orderDate = new Date(order.orderDate).getTime();
//       const fromDate = new Date(filters.dateFrom).getTime();
//       const toDate = new Date(filters.dateTo).getTime();

//       if (orderDate < fromDate || orderDate > toDate) {
//         return false;
//       }
//     }

//     // Filter by status (skip if "all" is selected)
//     if (
//       filters.status &&
//       filters.status !== "all" &&
//       order.orderStatus !== filters.status
//     ) {
//       return false;
//     }

//     // Filter by price range
//     if (filters.minPrice && order.totalAmount < Number(filters.minPrice)) {
//       return false;
//     }
//     if (filters.maxPrice && order.totalAmount > Number(filters.maxPrice)) {
//       return false;
//     }

//     return true;
//   });

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>All Orders</CardTitle>
//         <CardContent className="space-y-4">
//           {/* Filter Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//             {/* Date From Filter */}
//             <div>
//               <Label htmlFor="dateFrom">From Date</Label>
//               <Input
//                 id="dateFrom"
//                 name="dateFrom"
//                 type="date"
//                 value={filters.dateFrom}
//                 onChange={handleFilterChange}
//               />
//             </div>

//             {/* Date To Filter */}
//             <div>
//               <Label htmlFor="dateTo">To Date</Label>
//               <Input
//                 id="dateTo"
//                 name="dateTo"
//                 type="date"
//                 value={filters.dateTo}
//                 onChange={handleFilterChange}
//               />
//             </div>

//             {/* Status Filter */}
//             {/* Status Filter */}
//             <div>
//               <Label htmlFor="status">Status</Label>
//               <Select value={filters.status} onValueChange={handleStatusChange}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="rejected">Rejected</SelectItem>
//                   <SelectItem value="shipped">Shipped</SelectItem>
//                   <SelectItem value="delivered">Delivered</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Min Price Filter */}
//             <div>
//               <Label htmlFor="minPrice">Min Price</Label>
//               <Input
//                 id="minPrice"
//                 name="minPrice"
//                 type="number"
//                 placeholder="Min amount"
//                 value={filters.minPrice}
//                 onChange={handleFilterChange}
//               />
//             </div>

//             {/* Max Price Filter */}
//             <div>
//               <Label htmlFor="maxPrice">Max Price</Label>
//               <Input
//                 id="maxPrice"
//                 name="maxPrice"
//                 type="number"
//                 placeholder="Max amount"
//                 value={filters.maxPrice}
//                 onChange={handleFilterChange}
//               />
//             </div>
//           </div>

//           {/* Filter Actions */}
//           <div className="flex justify-end space-x-2">
//             <Button variant="outline" onClick={resetFilters}>
//               Reset Filters
//             </Button>
//           </div>

//           {/* Orders Table */}
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Order Date</TableHead>
//                 <TableHead>Order Status</TableHead>
//                 <TableHead>Order Price</TableHead>
//                 <TableHead>
//                   <span className="sr-only">Details</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredOrders && filteredOrders.length > 0 ? (
//                 filteredOrders.map((orderItem) => (
//                   <TableRow key={orderItem?._id}>
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>
//                       {orderItem?.orderDate
//                         ? orderItem.orderDate.split("T")[0]
//                         : "N/A"}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "rejected"
//                             ? "bg-red-500"
//                             : "bg-black"
//                         }`}
//                       >
//                         {orderItem?.orderStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>Rs. {orderItem?.totalAmount}</TableCell>
//                     <TableCell>
//                       <Button
//                         onClick={() => handleViewDetails(orderItem?._id)}
//                         className="bg-blue-600 hover:bg-blue-700"
//                       >
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center">
//                     No orders found matching your filters
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </CardHeader>

//       {/* Single Dialog outside the table */}
//       <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
//         <DialogContent>
//           {loading ? (
//             <p>Loading order details...</p>
//           ) : orderDetails ? (
//             <AdminOrderDetailsView orderDetails={orderDetails} />
//           ) : (
//             <p>Could not load order details</p>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default AdminOrdersView;

//Filter method added in order section✅

import React, { useState, useEffect } from "react";
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
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import AdminOrderDetailsView from "./order-details";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "",
    minPrice: "",
    maxPrice: "",
  });
  const dispatch = useDispatch();

  const { orderList, orderDetails, loading } = useSelector(
    (state) => state.adminOrder,
  );

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleViewDetails = (orderId) => {
    setCurrentOrderId(orderId);
    setOpenDetailsDialog(true);
    dispatch(getOrderDetailsForAdmin(orderId));
  };

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    setTimeout(() => dispatch(resetOrderDetails()), 300);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      status: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const formatOrderId = (id) => `#${id.slice(-5)}`;

  const filteredOrders = orderList?.filter((order) => {
    // Date filtering (fixed comparison)
    if (filters.dateFrom || filters.dateTo) {
      const orderDate = new Date(order.orderDate).setHours(0, 0, 0, 0);
      const fromDate = filters.dateFrom
        ? new Date(filters.dateFrom).setHours(0, 0, 0, 0)
        : -Infinity;
      const toDate = filters.dateTo
        ? new Date(filters.dateTo).setHours(23, 59, 59, 999)
        : Infinity;

      if (orderDate < fromDate || orderDate > toDate) return false;
    }

    // Status filtering
    if (
      filters.status &&
      filters.status !== "all" &&
      order.orderStatus !== filters.status
    ) {
      return false;
    }

    // Price filtering
    const minPrice = filters.minPrice ? Number(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    if (order.totalAmount < minPrice || order.totalAmount > maxPrice)
      return false;

    return true;
  });

  // Enhanced status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      confirmed: {
        label: "Confirmed",
        className:
          "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
      },
      pending: {
        label: "Pending",
        className:
          "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
      },
      rejected: {
        label: "Rejected",
        className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
      },
      inShipping: {
        label: "InShipping",
        className:
          "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
      },
      delivered: {
        label: "Delivered",
        className:
          "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
      },
    };

    return (
      <Badge
        variant="outline"
        className={`whitespace-nowrap capitalize text-xs px-2.5 py-1 rounded-full border 
          ${statusConfig[status]?.className || "bg-gray-100 text-gray-800"}`}
      >
        {statusConfig[status]?.label || status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold">Order Management</CardTitle>

        {/* Filter Section */}
        <div className="bg-muted/50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="space-y-1">
              <Label className="text-sm">From Date</Label>
              <Input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                max={filters.dateTo} // Prevent selecting "from" date after "to" date
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm">To Date</Label>
              <Input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                min={filters.dateFrom} // Prevent selecting "to" date before "from" date
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Status</Label>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="inShipping">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Min Price (रु)</Label>
              <Input
                name="minPrice"
                type="number"
                min="0"
                placeholder="500"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Max Price (रु)</Label>
              <Input
                name="maxPrice"
                type="number"
                min={filters.minPrice || "0"}
                placeholder="5000"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-1"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders?.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <span className="bg-muted px-2 py-1 rounded-md font-mono">
                        {formatOrderId(order._id)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.orderStatus} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className="font-mono">
                        रु {order.totalAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(order._id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No orders found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl">
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading order details...</p>
            </div>
          ) : orderDetails ? (
            <AdminOrderDetailsView orderDetails={orderDetails} />
          ) : (
            <div className="flex justify-center py-8">
              <p>Could not load order details</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminOrdersView;
