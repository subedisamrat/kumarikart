// import React, { useState } from "react";
// import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import ShoppingOrderDetailsView from "./order-details";
// import { Dialog } from "../ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
// import { Badge } from "../ui/badge";

// const ShoppingOrders = () => {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

//   function handlefetchOrderDetails(getId) {
//     dispatch(getOrderDetails(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersByUserId(user?.id));
//   }, [dispatch]);

//   useEffect(() => {
//     if (orderDetails !== null) {
//       setOpenDetailsDialog(true);
//     }
//   }, [orderDetails]);

//   //console.log(orderDetails);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Order Date</TableHead>
//               <TableHead>Order Status</TableHead>
//               <TableHead>Order Price</TableHead>
//               <TableHead>
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           {/* <TableBody>
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                   <TableRow key={orderItem?._id}>
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "delivered"
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
//                       <Dialog
//                         open={openDetailsDialog}
//                         onOpenChange={() => {
//                           setOpenDetailsDialog(false);
//                           dispatch(resetOrderDetails());
//                         }}
//                       >
//                         <Button
//                           onClick={() =>
//                             handlefetchOrderDetails(orderItem?._id)
//                           }
//                           className="bg-blue-600 hover:bg-blue-700"
//                         >
//                           View Details
//                         </Button>
//                         <ShoppingOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody> */}

//           <TableBody>
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                   <TableRow key={orderItem?._id}>
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>
//                       {orderItem?.orderDate?.split("T")[0] ?? "N/A"}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "delivered"
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
//                       <Dialog
//                         open={openDetailsDialog}
//                         onOpenChange={() => {
//                           setOpenDetailsDialog(false);
//                           dispatch(resetOrderDetails());
//                         }}
//                       >
//                         <Button
//                           onClick={() =>
//                             handlefetchOrderDetails(orderItem?._id)
//                           }
//                           className="bg-blue-600 hover:bg-blue-700"
//                         >
//                           View Details
//                         </Button>
//                         <ShoppingOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default ShoppingOrders;

//new with fine working dialog✅

// import React, { useState, useEffect, useCallback } from "react";
// import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import ShoppingOrderDetailsView from "./order-details";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
//   DialogClose,
// } from "../ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
// import { Skeleton } from "../ui/skeleton"; // Add a skeleton loader component

// const ShoppingOrders = () => {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [currentOrderId, setCurrentOrderId] = useState(null);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const {
//     orderList,
//     orderDetails,
//     loading: orderLoading,
//   } = useSelector((state) => state.shopOrder);

//   // Memoized fetch function
//   const fetchOrders = useCallback(() => {
//     if (user?.id) {
//       dispatch(getAllOrdersByUserId(user.id));
//     }
//   }, [dispatch, user?.id]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleOpenDetails = useCallback((orderId) => {
//     setCurrentOrderId(orderId);
//     setOpenDetailsDialog(true);
//   }, []);

//   const handleCloseDetails = useCallback(() => {
//     setOpenDetailsDialog(false);
//     dispatch(resetOrderDetails());
//   }, [dispatch]);

//   // Load details when dialog opens and we have an order ID
//   useEffect(() => {
//     if (openDetailsDialog && currentOrderId) {
//       dispatch(getOrderDetails(currentOrderId));
//     }
//   }, [openDetailsDialog, currentOrderId, dispatch]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Order Date</TableHead>
//               <TableHead>Order Status</TableHead>
//               <TableHead>Order Price</TableHead>
//               <TableHead>
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orderLoading && !orderList ? (
//               // Skeleton loading state for initial load
//               Array(5)
//                 .fill(0)
//                 .map((_, index) => (
//                   <TableRow key={`skeleton-${index}`}>
//                     <TableCell>
//                       <Skeleton className="h-4 w-[100px]" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-[80px]" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-[100px]" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-[60px]" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-[100px]" />
//                     </TableCell>
//                   </TableRow>
//                 ))
//             ) : orderList && orderList.length > 0 ? (
//               orderList.map((orderItem) => (
//                 <TableRow key={orderItem?._id}>
//                   <TableCell>{orderItem?._id}</TableCell>
//                   <TableCell>
//                     {orderItem?.orderDate?.split("T")[0] || "N/A"}
//                   </TableCell>
//                   <TableCell>
//                     <span
//                       className={`py-1 px-3 rounded text-white ${
//                         orderItem?.orderStatus === "confirmed"
//                           ? "bg-green-500"
//                           : orderItem?.orderStatus === "delivered"
//                           ? "bg-green-500"
//                           : orderItem?.orderStatus === "rejected"
//                           ? "bg-red-500"
//                           : "bg-black"
//                       }`}
//                     >
//                       {orderItem?.orderStatus}
//                     </span>
//                   </TableCell>
//                   <TableCell>Rs. {orderItem?.totalAmount}</TableCell>
//                   <TableCell>
//                     <Button
//                       className="bg-blue-600 hover:bg-blue-700"
//                       onClick={() => handleOpenDetails(orderItem?._id)}
//                     >
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center p-5">
//                   No orders found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>

//         {/* Move Dialog outside the table to render only once */}
//         <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
//           <DialogContent
//             className="max-w-lg"
//             onInteractOutside={handleCloseDetails}
//             onEscapeKeyDown={handleCloseDetails}
//           >
//             <DialogTitle>Order Details</DialogTitle>
//             <DialogDescription>
//               {orderLoading ? (
//                 <div className="space-y-4 py-5">
//                   <Skeleton className="h-4 w-full" />
//                   <Skeleton className="h-4 w-[200px]" />
//                   <Skeleton className="h-4 w-[150px]" />
//                 </div>
//               ) : orderDetails ? (
//                 <ShoppingOrderDetailsView orderDetails={orderDetails} />
//               ) : (
//                 <p className="text-center py-5">No details available.</p>
//               )}
//             </DialogDescription>
//             <DialogClose asChild>
//               <Button className="mt-4 w-full" onClick={handleCloseDetails}>
//                 Close
//               </Button>
//             </DialogClose>
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default ShoppingOrders;

//Filter options

// import React, { useState, useEffect, useCallback } from "react";
// import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
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
// import ShoppingOrderDetailsView from "./order-details";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
// import { Skeleton } from "../ui/skeleton";

// const ShoppingOrders = () => {
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
//   const { user } = useSelector((state) => state.auth);
//   const {
//     orderList,
//     orderDetails,
//     loading: orderLoading,
//   } = useSelector((state) => state.shopOrder);

//   const fetchOrders = useCallback(() => {
//     if (user?.id) {
//       dispatch(getAllOrdersByUserId(user.id));
//     }
//   }, [dispatch, user?.id]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleOpenDetails = (orderId) => {
//     setCurrentOrderId(orderId);
//     setOpenDetailsDialog(true);
//     dispatch(getOrderDetails(orderId));
//   };

//   const handleCloseDetails = () => {
//     setOpenDetailsDialog(false);
//     setTimeout(() => dispatch(resetOrderDetails()), 300);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleStatusChange = (value) => {
//     setFilters((prev) => ({ ...prev, status: value }));
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

//   const formatOrderId = (id) => `#${id?.slice(-5) || ""}`;

//   // Simplified status configuration
//   const statusConfig = {
//     pending: {
//       label: "Pending",
//       className: "bg-yellow-100 text-yellow-800",
//       variant: "secondary",
//     },
//     confirmed: {
//       label: "Confirmed",
//       className: "bg-blue-100 text-blue-800",
//       variant: "default",
//     },
//     shipped: {
//       label: "In Shipping",
//       className: "bg-indigo-100 text-indigo-800",
//       variant: "default",
//     },
//     delivered: {
//       label: "Delivered",
//       className: "bg-green-100 text-green-800",
//       variant: "default",
//     },
//     rejected: {
//       label: "Rejected",
//       className: "bg-red-100 text-red-800",
//       variant: "destructive",
//     },
//   };

//   const StatusBadge = ({ status }) => {
//     const config = statusConfig[status] || {
//       label: status,
//       className: "bg-gray-100 text-gray-800",
//       variant: "outline",
//     };

//     return (
//       <Badge
//         variant={config.variant}
//         className={`capitalize text-xs px-2.5 py-1 rounded-full ${config.className}`}
//       >
//         {config.label}
//       </Badge>
//     );
//   };

//   const filteredOrders = orderList?.filter((order) => {
//     // Date filtering
//     if (filters.dateFrom || filters.dateTo) {
//       const orderDate = new Date(order.orderDate).setHours(0, 0, 0, 0);
//       const fromDate = filters.dateFrom
//         ? new Date(filters.dateFrom).setHours(0, 0, 0, 0)
//         : -Infinity;
//       const toDate = filters.dateTo
//         ? new Date(filters.dateTo).setHours(23, 59, 59, 999)
//         : Infinity;
//       if (orderDate < fromDate || orderDate > toDate) return false;
//     }

//     // Status filtering
//     if (
//       filters.status &&
//       filters.status !== "all" &&
//       order.orderStatus !== filters.status
//     ) {
//       return false;
//     }

//     // Price filtering
//     const minPrice = filters.minPrice ? Number(filters.minPrice) : 0;
//     const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
//     if (order.totalAmount < minPrice || order.totalAmount > maxPrice)
//       return false;

//     return true;
//   });

//   return (
//     <Card>
//       <CardHeader className="space-y-4">
//         <CardTitle className="text-2xl font-bold">Your Order History</CardTitle>

//         {/* Simplified Filter Section */}
//         <div className="bg-muted/50 p-4 rounded-lg border">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
//             <div className="space-y-1">
//               <Label>From Date</Label>
//               <Input
//                 type="date"
//                 name="dateFrom"
//                 value={filters.dateFrom}
//                 onChange={handleFilterChange}
//                 max={filters.dateTo}
//               />
//             </div>

//             <div className="space-y-1">
//               <Label>To Date</Label>
//               <Input
//                 type="date"
//                 name="dateTo"
//                 value={filters.dateTo}
//                 onChange={handleFilterChange}
//                 min={filters.dateFrom}
//               />
//             </div>

//             <div className="space-y-1">
//               <Label>Status</Label>
//               <Select value={filters.status} onValueChange={handleStatusChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="All Statuses" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Statuses</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="shipped">In Shipping</SelectItem>
//                   <SelectItem value="delivered">Delivered</SelectItem>
//                   <SelectItem value="rejected">Rejected</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-1">
//               <Label>Min Price (रु)</Label>
//               <Input
//                 name="minPrice"
//                 type="number"
//                 min="0"
//                 placeholder="500"
//                 value={filters.minPrice}
//                 onChange={handleFilterChange}
//               />
//             </div>

//             <div className="space-y-1">
//               <Label>Max Price (रु)</Label>
//               <Input
//                 name="maxPrice"
//                 type="number"
//                 min={filters.minPrice || "0"}
//                 placeholder="5000"
//                 value={filters.maxPrice}
//                 onChange={handleFilterChange}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end mt-3">
//             <Button variant="outline" size="sm" onClick={resetFilters}>
//               Reset Filters
//             </Button>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader className="bg-muted/50">
//               <TableRow>
//                 <TableHead className="w-[120px]">Order ID</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {orderLoading && !orderList ? (
//                 Array(5)
//                   .fill(0)
//                   .map((_, index) => (
//                     <TableRow key={`skeleton-${index}`}>
//                       <TableCell>
//                         <Skeleton className="h-4 w-[100px]" />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton className="h-4 w-[80px]" />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton className="h-4 w-[100px]" />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton className="h-4 w-[60px]" />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton className="h-4 w-[100px]" />
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : filteredOrders?.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <TableRow key={order._id} className="hover:bg-muted/50">
//                     <TableCell className="font-medium">
//                       <span className="bg-muted px-2 py-1 rounded-md font-mono">
//                         {formatOrderId(order._id)}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       {new Date(order.orderDate).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </TableCell>
//                     <TableCell>
//                       <StatusBadge status={order.orderStatus} />
//                     </TableCell>
//                     <TableCell className="text-right font-medium">
//                       <span className="font-mono">
//                         रु {order.totalAmount.toLocaleString()}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleOpenDetails(order._id)}
//                       >
//                         View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={5}
//                     className="h-24 text-center text-muted-foreground"
//                   >
//                     {orderList?.length === 0
//                       ? "You haven't placed any orders yet"
//                       : "No orders match your filters"}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>

//       {/* Order Details Dialog */}
//       <Dialog open={openDetailsDialog} onOpenChange={handleCloseDetails}>
//         <DialogContent className="max-w-4xl">
//           {orderLoading ? (
//             <div className="space-y-4 py-5">
//               <Skeleton className="h-4 w-full" />
//               <Skeleton className="h-4 w-[200px]" />
//               <Skeleton className="h-4 w-[150px]" />
//             </div>
//           ) : orderDetails ? (
//             <ShoppingOrderDetailsView
//               orderDetails={orderDetails}
//               statusConfig={statusConfig}
//             />
//           ) : (
//             <div className="text-center py-5">
//               <p className="text-muted-foreground">
//                 Could not load order details
//               </p>
//               <Button
//                 variant="outline"
//                 className="mt-3"
//                 onClick={() => handleOpenDetails(currentOrderId)}
//               >
//                 Retry
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default ShoppingOrders;

//----------------------------------------------------------------------------------------------------------------------------------------//

//Filter added for order status✅
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
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
import ShoppingOrderDetailsView from "./order-details";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Skeleton } from "../ui/skeleton";

const ShoppingOrders = () => {
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
  const { user } = useSelector((state) => state.auth);
  const {
    orderList,
    orderDetails,
    loading: orderLoading,
  } = useSelector((state) => state.shopOrder);

  const fetchOrders = useCallback(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOpenDetails = (orderId) => {
    setCurrentOrderId(orderId);
    setOpenDetailsDialog(true);
    dispatch(getOrderDetails(orderId));
  };

  const handleCloseDetails = () => {
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

  const formatOrderId = (id) => `#${id?.slice(-5) || ""}`;

  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
      variant: "secondary",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800",
      variant: "default",
    },
    shipped: {
      label: "InShipping",
      className: "bg-indigo-100 text-indigo-800",
      variant: "default",
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800",
      variant: "default",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-800",
      variant: "destructive",
    },
  };

  const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || {
      label: status,
      className: "bg-gray-100 text-gray-800",
      variant: "outline",
    };

    return (
      <Badge
        variant={config.variant}
        className={`capitalize text-xs px-2.5 py-1 rounded-full ${config.className}`}
      >
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orderList?.filter((order) => {
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

    if (
      filters.status &&
      filters.status !== "all" &&
      order.orderStatus !== filters.status
    ) {
      return false;
    }

    const minPrice = filters.minPrice ? Number(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    if (order.totalAmount < minPrice || order.totalAmount > maxPrice)
      return false;

    return true;
  });

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold">Your Order History</CardTitle>

        <div className="bg-muted/50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="space-y-1">
              <Label>From Date</Label>
              <Input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                max={filters.dateTo}
              />
            </div>

            <div className="space-y-1">
              <Label>To Date</Label>
              <Input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                min={filters.dateFrom}
              />
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="inShipping">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Min Price (रु)</Label>
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
              <Label>Max Price (रु)</Label>
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
            <Button variant="outline" size="sm" onClick={resetFilters}>
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
              {orderLoading && !orderList ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[60px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : filteredOrders?.length > 0 ? (
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
                        onClick={() => handleOpenDetails(order._id)}
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
                    {orderList?.length === 0
                      ? "You haven't placed any orders yet"
                      : "No orders match your filters"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDetails}>
        <DialogContent className="max-w-4xl">
          {orderLoading ? (
            <div className="space-y-4 py-5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ) : orderDetails ? (
            <ShoppingOrderDetailsView
              orderDetails={orderDetails}
              statusConfig={statusConfig}
            />
          ) : (
            <div className="text-center py-5">
              <p className="text-muted-foreground">
                Could not load order details
              </p>
              <Button
                variant="outline"
                className="mt-3"
                onClick={() => handleOpenDetails(currentOrderId)}
              >
                Retry
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ShoppingOrders;
