// import { Routes, Route, useNavigate } from "react-router-dom";
// import CheckAuth from "./components/common/checkauth";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminFeatures from "./pages/admin-view/features";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminProducts from "./pages/admin-view/products";
// import Shoppinglayout from "./components/shopping-view/layout";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingList from "./pages/shopping-view/productListing";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingAccount from "./pages/shopping-view/account";
// import NotFound from "./pages/Error/index";
// import UnAuthPage from "./pages/Error/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Navigate } from "react-router-dom";
// import PaypalReturnPage from "./pages/shopping-view/paypal-return";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth,
//   );

//   const dispatch = useDispatch();
//   //const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800px] h-[600px] rounded-md" />;

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <CheckAuth
//               isAuthenticated={isAuthenticated}
//               user={user}
//             ></CheckAuth>
//           }
//         />
//         {/* Error Page */}
//         <Route path="*" element={<NotFound />} />
//         <Route path="/unauth-page" element={<UnAuthPage />} />
//         <Route
//           path="/"
//           element={
//             <CheckAuth
//               isAuthenticated={isAuthenticated}
//               user={user}
//             ></CheckAuth>
//           }
//         />
//         <Route />
//         {/* AuthLayout i.e Authorisation Page where user is checked if it's legit or not*/}
//         <Route
//           path="/auth"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AuthLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="login" element={<AuthLogin />} />
//           <Route path="register" element={<AuthRegister />} />
//         </Route>
//         <Route
//           path="/admin"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="features" element={<AdminFeatures />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="products" element={<AdminProducts />} />
//         </Route>
//         {/* Shopping Page */}
//         {/*
//         <Route
//           path="/shop"
//           element={
//             <CheckAuth inLayout isAuthenticated={isAuthenticated} user={user}>
//               <Shoppinglayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="listing" element={<ShoppingList />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="account" element={<ShoppingAccount />} />
//         </Route> */}

//         <Route
//           path="/shop"
//           element={
//             <CheckAuth inLayout isAuthenticated={isAuthenticated} user={user}>
//               <Shoppinglayout />
//             </CheckAuth>
//           }
//         >
//           {/* Default route to redirect to /shop/home */}
//           <Route index element={<Navigate to="/shop/home" replace />} />
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="listing" element={<ShoppingList />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="account" element={<ShoppingAccount />} />
//           <Route path="paypal-return" element={<PaypalReturnPage />} />
//           <Route path="payment-success" element={<PaymentSuccessPage />} />
//           <Route path="search" element={<SearchProducts />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, useNavigate } from "react-router-dom";
import CheckAuth from "./components/common/checkauth";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import Shoppinglayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingList from "./pages/shopping-view/productListing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import NotFound from "./pages/Error/index";
import UnAuthPage from "./pages/Error/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "react-router-dom";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header Skeleton */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Skeleton className="h-10 w-32 rounded-md" />
            <div className="hidden md:flex items-center space-x-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-md" />
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar (if applicable) */}
            <div className="hidden md:block md:col-span-3">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-9">
              <Skeleton className="h-8 w-1/3 mb-6 rounded-md" />

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                      <Skeleton className="h-4 w-1/2 rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <div className="pt-2 flex justify-between">
                        <Skeleton className="h-8 w-20 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-6 w-24 rounded-md" />
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full rounded-md" />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
              <Skeleton className="h-6 w-32 rounded-md" />
              <div className="flex space-x-4 mt-4 md:mt-0">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-6 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        {/* Error Page */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route />
        {/* AuthLayout i.e Authorisation Page where user is checked if it's legit or not*/}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        {/* Shopping Page */}
        <Route
          path="/shop"
          element={
            <CheckAuth inLayout isAuthenticated={isAuthenticated} user={user}>
              <Shoppinglayout />
            </CheckAuth>
          }
        >
          {/* Default route to redirect to /shop/home */}
          <Route index element={<Navigate to="/shop/home" replace />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
